import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import BaseForm from './BaseForm'
import FormField from './FormField'
import {
  signUpShemaForFirstStep,
  signUpShemaForSecondStep
} from '@/common/validationSchema'

interface FormValuesFromFirstStep {
  email: string
  password: string
}

interface FormValues {
  email: string
  password: string
  passwordConfirmation: string
}

interface FormValuesForSecondStep {
  firstName: string
  lastName: string
  phone: string
}

const initialValuesForFirstStep = {
  email: '',
  password: '',
  passwordConfirmation: ''
}

const initialValuesForSecondStep = {
  firstName: '',
  lastName: '',
  phone: ''
}

const SignUpForm: FC = () => {
  const router = useRouter()
  const { signUp } = useActions()
  const { isLoading, isAuth } = useTypedSelector(
    (store) => store.auth
  )
  const { isError } = useTypedSelector(
    (store) => store.error
  )
  const [secondStep, setSecondStep] = useState(false)
  const [formValuesFromFirstStep, setFormValuesFromFirstStep] =
    useState<FormValuesFromFirstStep>({} as FormValuesFromFirstStep)

  const hanldeSubmitFirstStep = (formValues: FormValues) => {
    const credentials = {
      email: formValues.email,
      password: formValues.password
    }

    setFormValuesFromFirstStep(credentials)
    setSecondStep(true)
  }

  useEffect(() => {
    if (isAuth) router.push('/profile')
  }, [isAuth, router])

  useEffect(() => {
    if (isError) setSecondStep(false)
  }, [isError])

  const hanldeSubmitSecondStep = (formValues: FormValuesForSecondStep) => {
    const credentials = {
      ...formValues,
      ...formValuesFromFirstStep
    }

    signUp(credentials)
  }

  const getTabIndex = () => (secondStep ? 1 : 0)

  return (
    <BaseForm title='Sign up'>
      <Tabs isFitted index={getTabIndex()} colorScheme='primary.main'>
        <TabList>
          <Tab isDisabled={secondStep}>First step</Tab>
          <Tab isDisabled={!secondStep}>Second step</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px='0'>
            <Formik
              initialValues={initialValuesForFirstStep}
              onSubmit={hanldeSubmitFirstStep}
              validationSchema={signUpShemaForFirstStep}
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
                          (form.errors.password &&
                            form.touched.password) as boolean
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
                        errorMessage={
                          form.errors.passwordConfirmation as string
                        }
                      />
                    )}
                  </Field>

                  <Flex
                    alignContent='center'
                    justifyContent='space-evenly'
                    mt={2}
                  >
                    <Text textAlign='center'>Already have an account?</Text>
                    <Link href='sign-in'>
                      <Text
                        as='a'
                        _hover={{
                          cursor: 'pointer'
                        }}
                      >
                        Sign in
                      </Text>
                    </Link>
                  </Flex>

                  <Button
                    mt={6}
                    width='100%'
                    type='submit'
                    isLoading={isLoading}
                    disabled={!props.isValid}
                    _disabled={{
                      bg: 'primary.disabled'
                    }}
                    _hover={{
                      bg: 'primary.hover'
                    }}
                    rightIcon={<ArrowForwardIcon mt='2px' w={6} h={6} />}
                  >
                    Next
                  </Button>
                </Form>
              )}
            </Formik>
          </TabPanel>

          <TabPanel px='0'>
            <Formik
              initialValues={initialValuesForSecondStep}
              onSubmit={hanldeSubmitSecondStep}
              validationSchema={signUpShemaForSecondStep}
            >
              {(props) => (
                <Form>
                  <Field name='firstName'>
                    {({ field, form }: FieldProps) => (
                      <FormField
                        name='First name'
                        field={field}
                        isInvalid={
                          (form.errors.firstName &&
                            form.touched.firstName) as boolean
                        }
                        errorMessage={form.errors.firstName as string}
                      />
                    )}
                  </Field>

                  <Field name='lastName'>
                    {({ field, form }: FieldProps) => (
                      <FormField
                        name='Last name'
                        field={field}
                        isInvalid={
                          (form.errors.lastName &&
                            form.touched.lastName) as boolean
                        }
                        errorMessage={form.errors.lastName as string}
                      />
                    )}
                  </Field>

                  <Field name='phone'>
                    {({ field, form }: FieldProps) => (
                      <FormField
                        name='Phone'
                        placeholder='+88005553535'
                        tel
                        field={field}
                        isInvalid={
                          (form.errors.phone && form.touched.phone) as boolean
                        }
                        errorMessage={form.errors.phone as string}
                      />
                    )}
                  </Field>

                  <Flex
                    alignContent='center'
                    justifyContent='space-evenly'
                    mt={2}
                  >
                    <Text textAlign='center'>Already have an account?</Text>
                    <Link href='sign-in'>
                      <Text
                        as='a'
                        _hover={{
                          cursor: 'pointer'
                        }}
                      >
                        Sign in
                      </Text>
                    </Link>
                  </Flex>

                  <Button
                    mt={6}
                    width='100%'
                    type='submit'
                    isLoading={isLoading}
                    disabled={!props.isValid}
                    _disabled={{
                      bg: 'primary.disabled'
                    }}
                    _hover={{
                      bg: 'primary.hover'
                    }}
                  >
                    Sign up
                  </Button>
                </Form>
              )}
            </Formik>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </BaseForm>
  )
}
export default SignUpForm
