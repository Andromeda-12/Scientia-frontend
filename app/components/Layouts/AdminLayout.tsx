import { Box, Center, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

import { LayoutProps } from '@/types/app'

import MainLayout from './MainLayout'

const AdminLayout: FC<LayoutProps> = ({ isServerSideAuth, children }) => {
  return (
    <MainLayout isServerSideAuth={isServerSideAuth}>
      <Box w='400px' m='0 auto' mb='20px'>
        <Flex justifyContent='space-between'>
          <Link href='/admin'>Заявки</Link>
          <Link href='/admin/approved-records'>Одобренные</Link>
          <Link href='/admin/overdued-records'>Просроченные</Link>
          <Link href='/admin/role-management'>Роли</Link>
        </Flex>
      </Box>

      {children}
    </MainLayout>
  )
}

export default AdminLayout
