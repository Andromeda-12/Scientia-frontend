import { Button } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FC } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import BaseForm from './BaseForm'
import FormField from './FormField'
import { changePasswordShema } from '@/common/validationSchema'
import { useDispatch } from 'react-redux'

interface ChangePasswordProps {}

interface FormValues {
  password: string
  passwordConfirmation: string
}

const initialValues = {
  password: '',
  passwordConfirmation: ''
}

const ChangePassword: FC<ChangePasswordProps> = () => {
  const { isAuth, isLoading } = useTypedSelector((store) => store.auth)
  const dispatch = useDispatch()

  const hanldeSubmit = (formValues: FormValues) => {
    const credentials = {
      password: formValues.password
    }

    console.log(formValues);
    console.log(credentials);

    
  }
  return (
    <BaseForm title='Change password'>
      <Formik
        initialValues={initialValues}
        onSubmit={hanldeSubmit}
        validationSchema={changePasswordShema}
      >
        {(props) => (
          <Form>
            <Field name='password'>
              {({ field, form }: FieldProps) => (
                <FormField
                  name='Password'
                  password
                  field={field}
                  isInvalid={
                    (form.errors.password && form.touched.password) as boolean
                  }
                  errorMessage={form.errors.password as string}
                />
              )}
            </Field>

            <Field name='passwordConfirmation'>
              {({ field, form }: FieldProps) => (
                <FormField
                  name='Password confirmation'
                  password
                  field={field}
                  isInvalid={
                    (form.errors.passwordConfirmation &&
                      form.touched.passwordConfirmation) as boolean
                  }
                  errorMessage={form.errors.passwordConfirmation as string}
                />
              )}
            </Field>

            <Button mt={6} width='100%' isLoading={isLoading} type='submit'>
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </BaseForm>
  )
}
export default ChangePassword
