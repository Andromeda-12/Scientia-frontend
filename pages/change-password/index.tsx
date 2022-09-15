import authService from 'api/authService'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'

import { Page } from '@/types/app'

import ChangePassword from '@/components/Forms/ChangePassword'
import CenterLayout from '@/components/Layouts/CenterLayout'

const ChangePasswordPage: Page = () => {
  const router = useRouter()
  // console.log(router.query);

  return <ChangePassword />
}

ChangePasswordPage.Layout = CenterLayout
// ???
// export const getServerSideProps = withCheckServerSideAuth()

export const getServerSideProps: GetServerSideProps<ParsedUrlQuery> = async (
  context
) => {
  try {
    const { token } = context?.query
    await authService.checkToken(token as string)
    return {
      props: {
        token
      }
    }
  } catch (error) {
    return { redirect: { destination: '/sign-in', permanent: true } }
  }
}

export default ChangePasswordPage
