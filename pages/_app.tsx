import { Box, ChakraProvider, Spinner, extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CustomAppProps } from '@/types/app'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import MainLayout from '@/components/Layouts/MainLayout'
import WithNotification from '@/components/Layouts/WithNotification'

import { wrapper } from '@/store'

import { theme } from '@/common/theme'
import { Roles } from '@/types/models/IUser'
import Spiner from '@/components/Spiner'

function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter()
  const { getCurrentUser } = useActions()
  const { currentUser } = useTypedSelector((store) => store.auth)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  console.log('test')

  useEffect(() => {
    const start = () => {
      setIsLoadingPage(true)
    }
    const end = () => {
      setIsLoadingPage(false)
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [])

  const Layout = Component.Layout || MainLayout

  useEffect(() => {
    if (Component.isNotFoundPage) setIsLoadingPage(false)
  }, [Component.isNotFoundPage])

  useEffect(() => {
    if (Component.requiredAdminRole && currentUser?.role === Roles.Reader) {
      router.back()
      return
    }

    if (Component.requiredSuperAdminRole && currentUser?.role !== Roles.SuperAdmin) {
      router.back()
      return
    }

    if (currentUser) setIsLoadingPage(false)
    if (!currentUser && !pageProps.isAuth) setIsLoadingPage(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component.requiredAdminRole, Component.requiredSuperAdminRole, currentUser])

  useEffect(() => {
    if (pageProps.isAuth && !currentUser && currentUser !== null) {
      getCurrentUser()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProps.isAuth])

  return (
    <ChakraProvider theme={theme}>
      {/* <RouteGuard isServerSideAuth={pageProps.isAuth}> */}
      {isLoadingPage && <Spiner />}
      <Box display={isLoadingPage ? 'none' : 'block'}>
        <WithNotification>
          <Layout isServerSideAuth={pageProps.isAuth}>
            <Component {...pageProps} />
          </Layout>
        </WithNotification>
      </Box>
      {/* </RouteGuard> */}
    </ChakraProvider>
  )
}

export default wrapper.withRedux(App)
