import { Box, Button } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FC } from 'react'

import FormField from '../Forms/FormField'

interface WriteReviewProps {}

const initialValues = {
  review: ''
}

const WriteReview: FC<WriteReviewProps> = () => {
  const handleSubmit = () => {}

  return (
    <Box rounded='lg' bg='secondary.main'>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <Field name='review'>
              {({ field, form }: FieldProps) => (
                <FormField
                  name=''
                  field={field}
                  placeholder='Напишите свой отзыв'
                  textarea
                  isInvalid={
                    (form.errors.review && form.touched.review) as boolean
                  }
                  errorMessage={form.errors.review as string}
                />
              )}
            </Field>

            <Button mt={6} width='100%' type='submit'>
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default WriteReview
