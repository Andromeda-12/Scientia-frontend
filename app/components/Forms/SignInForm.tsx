import { Button, Checkbox, Flex, Text } from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import BaseForm from './BaseForm'
import FormField from './FormField'
import { signInShema } from '@/common/validationSchema'

interface FormValues {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: ''
}

const SignInForm: FC = () => {
  const { signIn } = useActions()
  const router = useRouter()
  const { isLoading, isAuth } = useTypedSelector((store) => store.auth)

  useEffect(() => {
    if (isAuth) router.push('/')
  }, [isAuth, router])

  const hanldeSubmit = (credentials: FormValues) => {
    signIn(credentials)
  }

  return (
    <BaseForm title='Sign in'>
      <Formik
        initialValues={initialValues}
        onSubmit={hanldeSubmit}
        validationSchema={signInShema}
      >
        {(props) => (
          <Form>
            <Field name='email'>
              {({ field, form }: FieldProps) => (
                <FormField
                  name='E-mail'
                  field={field}
                  isInvalid={
                    (form.errors.email && form.touched.email) as boolean
                  }
                  errorMessage={form.errors.email as string}
                />
              )}
            </Field>

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

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              align='start'
              justify='space-between'
            >
              <Checkbox
                colorScheme='whiteAlpha'
                borderColor='gray'
                iconColor='black'
              >
                Remember me
              </Checkbox>
              <Link href='/change-password'>Forgot password?</Link>
            </Flex>

            <Flex alignContent='center' justifyContent='space-evenly' mt={2}>
              <Text textAlign='center'>Don&apos;t have an account yet?</Text>
              <Link href='sign-up'>
                <Text variant='link'>Sign up</Text>
              </Link>
            </Flex>

            <Button mt={6} width='100%' isLoading={isLoading} type='submit'>
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </BaseForm>
  )
}
export default SignInForm
