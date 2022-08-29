import CenterLayout from '@/components/Layouts/CenterLayout'
import { Page } from '@/types/app'
import { Box, Text } from '@chakra-ui/react'

const NotFoundPage: Page = () => {
  return (
    <Box textAlign='center'>
      <Text fontWeight='bold' fontSize='2xl'>Oops 😯</Text>
      <Text fontWeight='medium' fontSize='xl'>There is nothing here(</Text>
    </Box>
  )
}

NotFoundPage.Layout = CenterLayout

export default NotFoundPage
