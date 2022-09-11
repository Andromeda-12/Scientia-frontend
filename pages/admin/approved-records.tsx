import { Center } from '@chakra-ui/react'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import AdminLayout from '@/components/Layouts/AdminLayout'
import ApprovedRecordList from '@/components/admin/ApprovedRecordList'
import RecordsList from '@/components/admin/RecordsList'

const ApprovedRecordsPage: Page = () => {
  return (
    <Center>
      <ApprovedRecordList />
    </Center>
  )
}

ApprovedRecordsPage.Layout = AdminLayout
ApprovedRecordsPage.requiredAdminRole = true

export const getServerSideProps = withCheckServerSideAuth()

export default ApprovedRecordsPage
