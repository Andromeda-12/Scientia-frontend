import { Center } from '@chakra-ui/react'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import AdminLayout from '@/components/Layouts/AdminLayout'
import RecordsList from '@/components/admin/RecordsList'

const RecordsPage: Page = () => {
  return (
    <Center>
      <RecordsList />
    </Center>
  )
}

RecordsPage.Layout = AdminLayout
RecordsPage.requiredAdminRole = true

export const getServerSideProps = withCheckServerSideAuth()

export default RecordsPage
