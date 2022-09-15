import { Page } from '@/types/app'

import SignInForm from '@/components/Forms/SignInForm'
import CenterLayout from '@/components/Layouts/CenterLayout'

const SignIn: Page = () => {
  return (
    <>
      <SignInForm />
    </>
  )
}

SignIn.Layout = CenterLayout

// export const getServerSideProps = withCheckServerSideAuth()

export default SignIn
