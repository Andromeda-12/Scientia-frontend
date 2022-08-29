import { Flex, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import ChangePassword from '@/components/Forms/ChangePassword'
import SignUpForm from '@/components/Forms/SIgnUpForm'
import CenterLayout from '@/components/Layouts/CenterLayout'

import { clearSignUpError } from '@/store/auth'

const SignUp: Page = () => {
  const { isAuth } = useTypedSelector((store) => store.auth)

  const toast = useToast()
  const dispatch = useDispatch()

  return <ChangePassword />
}

SignUp.Layout = CenterLayout

export const getServerSideProps = withCheckServerSideAuth()

export default SignUp
