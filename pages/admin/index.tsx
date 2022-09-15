import { Box, Center, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import AdminLayout from '@/components/Layouts/AdminLayout'

const AdminPage: Page = () => {
  return <></>
}

AdminPage.Layout = AdminLayout
AdminPage.requiredAdminRole = true

export const getServerSideProps = withCheckServerSideAuth(async () => {
  return {
    redirect: { destination: '/admin/records', permanent: true }
  }
})

export default AdminPage
