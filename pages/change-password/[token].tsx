import authService from 'api/authService'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { Page } from '@/types/app'

import ChangePassword from '@/components/Forms/ChangePassword'
import CenterLayout from '@/components/Layouts/CenterLayout'

const SignUp: Page = () => {
  return <ChangePassword />
}

SignUp.Layout = CenterLayout
// ???
// export const getServerSideProps = withCheckServerSideAuth()

// export const getServerSideProps: GetServerSideProps<ParsedUrlQuery> = async (
//   context
// ) => {
//   const { token } = context?.params
//   const { data: isValid } = await authService.checkToken(token)

//   if (isValid)
//     return {
//       props: {
//         token
//       }
//     }

//   return { redirect: { destination: '/sign-in', permanent: false } }
// }

export default SignUp
