import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FC, useState } from 'react'

import { useActions } from '@/hooks/useActoins'

import FormField from '../Forms/FormField'
import ImageUpload from '../Forms/ImageUpload'

import { createBookShema } from '@/common/validationSchema'
import { ICreateBookData } from '@/types/models/IBook'

interface CreateBookModalProps {
  onClose: () => void
  isOpen: boolean
}

const initialValues = {
  title: '',
  description: '',
  author: '',
  count: 0
}

const CreateBookModal: FC<CreateBookModalProps> = ({ isOpen, onClose }) => {
  const [count, setCount] = useState<number>(1)
  const [image, setImage] = useState()
  const { createBook } = useActions()

  const handleChangeNumberInput = (value: string) => setCount(+value)

  const handleImageInput = (image) => {
    setImage(image)
  }

  const handleSubmit = (book: typeof initialValues) => {
    book.count = count

    const createBookData: ICreateBookData = {
      book,
      cover: undefined
    }

    if (image) {
      const bookCover = new FormData()
      bookCover.append('cover', image)
      createBookData.cover = bookCover
    }

    createBook(createBookData)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      size='2xl'
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить книгу</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={createBookShema}
          >
            {(props) => (
              <Form>
                <Field name='title'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name='Название книги'
                      field={field}
                      isInvalid={
                        (form.errors.title && form.touched.title) as boolean
                      }
                      errorMessage={form.errors.title as string}
                    />
                  )}
                </Field>

                <Field name='author'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name='Автор книги'
                      field={field}
                      isInvalid={
                        (form.errors.author && form.touched.author) as boolean
                      }
                      errorMessage={form.errors.author as string}
                    />
                  )}
                </Field>

                <Field name='description'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name='Описание книги'
                      field={field}
                      textarea
                      placeholder='Описание книги'
                      isInvalid={
                        (form.errors.description &&
                          form.touched.description) as boolean
                      }
                      errorMessage={form.errors.description as string}
                    />
                  )}
                </Field>

                <Text mb={3}>Количество книг</Text>

                <NumberInput
                  min={1}
                  value={count}
                  onChange={handleChangeNumberInput}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Box mt={5}>
                  <ImageUpload onInput={handleImageInput} />
                </Box>

                <ModalFooter>
                  <Button type='submit' mr={3}>
                    Добавить
                  </Button>
                  <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateBookModal
