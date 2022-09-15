import { Center } from '@chakra-ui/react'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import AdminLayout from '@/components/Layouts/AdminLayout'
import RecordsList from '@/components/admin/RecordsList'
import UsersList from '@/components/admin/UsersList'

const RoleManagement: Page = () => {
  return (
    <Center>
      <UsersList />
    </Center>
  )
}

RoleManagement.Layout = AdminLayout
RoleManagement.requiredSuperAdminRole = true

export const getServerSideProps = withCheckServerSideAuth()

export default RoleManagement
