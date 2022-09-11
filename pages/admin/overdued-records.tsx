import { Center } from '@chakra-ui/react'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import AdminLayout from '@/components/Layouts/AdminLayout'
import OverduedRecordsList from '@/components/admin/OverduedRecordsList'

const OverduedRecordsPage: Page = () => {
  return (
    <Center>
      <OverduedRecordsList />
    </Center>
  )
}

OverduedRecordsPage.Layout = AdminLayout
OverduedRecordsPage.requiredAdminRole = true

export const getServerSideProps = withCheckServerSideAuth()

export default OverduedRecordsPage
