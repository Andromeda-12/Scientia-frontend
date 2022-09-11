import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import ReactStars from 'react-rating-stars-component'

import { IReviewRequest } from '@/types/models/IReview'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import FormField from '../Forms/FormField'

import { reviewShema } from '@/common/validationSchema'

interface WriteReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

const initialValues = {
  text: ''
}

const WriteReviewModal: FC<WriteReviewModalProps> = ({ isOpen, onClose }) => {
  const { createReview } = useActions()
  const { currentBook } = useTypedSelector((store) => store.book)
  const [rating, setRating] = useState<number>(5)

  const ratingChanged = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmit = (formData: typeof initialValues) => {
    const data: IReviewRequest = {
      bookId: currentBook.id,
      text: formData.text,
      rating
    }

    createReview(data)
    onClose()
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
        <ModalHeader>Напишите о своих впечатлениях об книге</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={reviewShema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Field name='text'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name=''
                      field={field}
                      placeholder='Напишите свой отзыв'
                      textarea
                      isInvalid={
                        (form.errors.text && form.touched.text) as boolean
                      }
                      errorMessage={form.errors.text as string}
                    />
                  )}
                </Field>

                <ReactStars
                  count={5}
                  value={rating}
                  onChange={ratingChanged}
                  isHalf
                  size={35}
                  activeColor='#ffd700'
                />

                <ModalFooter>
                  <Button type='submit' mr={3}>
                    Отправить
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

export default WriteReviewModal
