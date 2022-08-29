import { Flex, useToast } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import SignUpForm from '@/components/Forms/SIgnUpForm'
import CenterLayout from '@/components/Layouts/CenterLayout'

import { clearSignUpError } from '@/store/auth'

const SignUp: Page = () => {
  const { signUpError } = useTypedSelector((store) => store.auth)
  const toast = useToast()
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(clearSignUpError())
  }

  useEffect(() => {
    if (signUpError) {
      toast({
        title: 'Signup error',
        description: signUpError,
        position: 'bottom-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: handleClose
      })
    }
  }, [signUpError, toast])
  return <SignUpForm />
}

SignUp.Layout = CenterLayout

export const getServerSideProps = withCheckServerSideAuth()

export default SignUp
