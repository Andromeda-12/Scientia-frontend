import { Box, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import SignInForm from '@/components/Forms/SignInForm'
import CenterLayout from '@/components/Layouts/CenterLayout'


const SignIn: Page = () => {
  // const { signInError } = useTypedSelector((store) => store.auth)
  // const toast = useToast()
  // const dispatch = useDispatch()

  // const handleClose = () => {
  //   dispatch(clearSignInError())
  // }

  // useEffect(() => {
  //   if (signInError) {
  //     toast({
  //       title: 'Signin error',
  //       description: signInError,
  //       position: 'bottom-right',
  //       // render: () => (
  //       //   <Box color='white' p={3} bg='white' textColor='primary.main'>
  //       //     {signInError}
  //       //   </Box>
  //       // ),
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //       onCloseComplete: handleClose
  //     })
  //   }
  // }, [signInError, toast])

  return (
    <>
      <SignInForm />
    </>
  )
}

SignIn.Layout = CenterLayout

// export const getServerSideProps = withCheckServerSideAuth()

export default SignIn
