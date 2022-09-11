import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import SignUpForm from '@/components/Forms/SIgnUpForm'
import CenterLayout from '@/components/Layouts/CenterLayout'

const SignUp: Page = () => {
  return <SignUpForm />
}

SignUp.Layout = CenterLayout

// export const getServerSideProps = withCheckServerSideAuth()

export default SignUp
