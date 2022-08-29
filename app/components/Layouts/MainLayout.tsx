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

      <Box as='main' bg='primary.main' color='text.main'>
        <Container bg='primary.main' maxW='90%' minH='80vh'>
          {children}
        </Container>
      </Box>

      <Footer />
    </>

    // </RouteGuard>
  )
}
export default MainLayout
