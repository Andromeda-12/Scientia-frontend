import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component'

import {
  IReview,
  IReviewRequest,
  IReviewUpdateRequest
} from '@/types/models/IReview'

import { useActions } from '@/hooks/useActoins'

import FormField from '../Forms/FormField'

import { reviewShema } from '@/common/validationSchema'

interface EditReviewModalProps {
  isOpen: boolean
  onClose: () => void
  review: IReview
}

const EditReviewModal: FC<EditReviewModalProps> = ({
  isOpen,
  onClose,
  review
}) => {
  const { updateReview } = useActions()
  const [rating, setRating] = useState<number>(review.rating)

  const initialValues = {
    text: review.text
  }

  const ratingChanged = (newRating: number) => {
    setRating(newRating)
  }

  const handleSubmit = (formData: typeof initialValues) => {
    const data: IReviewUpdateRequest = {
      id: review.id,
      text: formData.text,
      rating: +rating
    }

    updateReview(data)
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

export default EditReviewModal
