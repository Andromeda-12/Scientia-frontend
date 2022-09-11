import {
  Box,
  Button,
  Flex,
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
import { FC, useEffect, useState } from 'react'

import { IUpdateBook } from '@/types/models/IBook'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import FormField from '../Forms/FormField'

import { updateBookShema } from '@/common/validationSchema'
import { useRouter } from 'next/router'

interface EditBookModalProps {
  isOpen: boolean
  onClose: () => void
}

const EditBookModal: FC<EditBookModalProps> = ({ isOpen, onClose }) => {
  const { currentBook } = useTypedSelector((store) => store.book)
  const [count, setCount] = useState<number>(1)
  const router = useRouter()

  const { updateBookInfo, deleteBook } = useActions()

  const [initialBookInfo, setInitialBookInfo] = useState<IUpdateBook>(
    {} as IUpdateBook
  )

  useEffect(() => {
    if (currentBook) {
      setInitialBookInfo(currentBook)
      setCount(currentBook.count)
    }
  }, [currentBook])

  const handleChangeNumberInput = (value: string) => setCount(+value)

  const handleSubmit = (formData: IUpdateBook) => {
    const data = { ...formData }
    data.count = count
    console.log(data)
    updateBookInfo(data)
    onClose()
  }

  const handleDeleteBook = () => {
    deleteBook(currentBook.id)
    router.push('/books')
  }

  return (
    <Modal
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование профиля</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <>
            <Formik
              initialValues={initialBookInfo}
              validationSchema={updateBookShema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Form>
                  <Field name='title'>
                    {({ field, form }: FieldProps) => (
                      <FormField
                        name=''
                        field={field}
                        isInvalid={
                          (form.errors.title && form.touched.title) as boolean
                        }
                        errorMessage={form.errors.title as string}
                      />
                    )}
                  </Field>

                  <Field name='description'>
                    {({ field, form }: FieldProps) => (
                      <FormField
                        name=''
                        field={field}
                        isInvalid={
                          (form.errors.description &&
                            form.touched.description) as boolean
                        }
                        errorMessage={form.errors.description as string}
                      />
                    )}
                  </Field>

                  <Field name='author'>
                    {({ field, form }: FieldProps) => (
                      <FormField
                        name=''
                        field={field}
                        isInvalid={
                          (form.errors.author && form.touched.author) as boolean
                        }
                        errorMessage={form.errors.author as string}
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

                  <ModalFooter>
                    <Flex w='full' justifyContent='flex-end'>
                      <Flex justifySelf='flex-start' mr='190px'>
                        <Button onClick={handleDeleteBook}>
                          Удалить книгу
                        </Button>
                      </Flex>

                      <Flex justifySelf='flex-end'>
                        <Button type='submit' mr={3}>
                          Сохранить
                        </Button>
                      </Flex>

                      <Flex justifySelf='flex-end'>
                        <Button onClick={onClose}>Отмена</Button>
                      </Flex>
                    </Flex>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EditBookModal
