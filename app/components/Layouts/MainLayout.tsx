import { Box, Container } from '@chakra-ui/react'
import { FC } from 'react'

import { LayoutProps } from '@/types/app'

import Footer from '../Footer'
import Header from '../Header'
import RouteGuard from '../RouteGuard'

const MainLayout: FC<LayoutProps> = ({ children, isServerSideAuth }) => {
  return (
    // <RouteGuard isServerSideAuth={isServerSideAuth}>
    <>
      <Header isServerSideAuth={isServerSideAuth} />

      <Box as='main' color='text.black' bg='gray.200' py={7}>
        <Container  maxW='98%' minH='80vh'>
          {children}
        </Container>
      </Box>

      <Footer />
    </>

    // </RouteGuard>
  )
}
export default MainLayout
