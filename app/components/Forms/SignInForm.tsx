import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Input,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'
import authService from 'api/authService'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { NotificationType } from '@/store/notification'

import BaseForm from './BaseForm'
import FormField from './FormField'
import { recoveryPasswordShema, signInShema } from '@/common/validationSchema'

interface FormValues {
  email: string
  password: string
}

interface RecoveryPassword {
  email: string
}

const initialValues = {
  email: '',
  password: ''
}

const SignInForm: FC = () => {
  const cancelRef = useRef(null)
  const formRef = useRef<
    (Ref<FormikProps<{ email: string; password: string }>> | undefined) &
      RefObject<HTMLFormElement>
  >(null)
  const router = useRouter()
  const { isOpen, onOpen: openDialog, onClose: closeDialog } = useDisclosure()
  const { signIn, setNotification } = useActions()
  const { isLoading, isAuth } = useTypedSelector((store) => store.auth)
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuth) router.push('/')
  }, [isAuth, router])

  const hanldeSubmit = (credentials: FormValues) => {
    signIn(credentials)
  }

  const showDialog = () => {
    if (!formRef.current) return

    setEmail(formRef.current.values.email)
    openDialog()
  }

  const sendPasswordRecoveryEmail = async (credentials: RecoveryPassword) => {
    setLoading(true)

    try {
      await authService.sendPasswordRecoveryEmail(credentials.email)
      setNotification({
        title: 'Письмо отправлено',
        message: 'Проверьте свою почту',
        type: NotificationType.Notification
      })
      closeDialog()
    } catch (error) {
      setNotification({
        title: 'Не удалось отправить письмо',
        message: 'Проверьте правильно ли вы указали свою почту',
        type: NotificationType.Error
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BaseForm title='Sign in'>
        <Formik
          innerRef={formRef}
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

                <Box as='a' _hover={{ cursor: 'pointer' }} onClick={showDialog}>
                  Forgot password?
                </Box>
              </Flex>

              <Flex alignContent='center' justifyContent='space-evenly' mt={2}>
                <Text textAlign='center'>Don&apos;t have an account yet?</Text>
                <Link href='/sign-up'>
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

      <AlertDialog
        isCentered
        isOpen={isOpen}
        onClose={closeDialog}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <Formik
            initialValues={{ email }}
            onSubmit={sendPasswordRecoveryEmail}
            validationSchema={recoveryPasswordShema}
          >
            {(props) => (
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Восстановление пароля
                </AlertDialogHeader>

                <Form>
                  <AlertDialogBody>
                    <Text mb={6}>
                      Укажите почту, на которое придет письмо для восстановления
                      пароля
                    </Text>

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
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={closeDialog}>
                      Назад
                    </Button>

                    <Button type='submit' isLoading={loading} ml={3}>
                      Отправить
                    </Button>
                  </AlertDialogFooter>
                </Form>
              </AlertDialogContent>
            )}
          </Formik>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default SignInForm
