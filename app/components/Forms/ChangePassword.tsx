import { Button } from '@chakra-ui/react'
import authService from 'api/authService'
import { Field, FieldProps, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import BaseForm from './BaseForm'
import FormField from './FormField'
import { changePasswordShema } from '@/common/validationSchema'

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
  const { isLoading } = useTypedSelector((store) => store.auth)
  const router = useRouter()

  const hanldeSubmit = async (formValues: FormValues) => {
    const changePasswordData = {
      token: router.query.token as string,
      password: formValues.password
    }

    try {
      await authService.restorePassword(changePasswordData)
      router.push({ pathname: '/sign-in' })
    } catch (error) {
      
    }
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
