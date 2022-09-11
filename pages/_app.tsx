import { Box, ChakraProvider, Spinner, extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CustomAppProps } from '@/types/app'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import MainLayout from '@/components/Layouts/MainLayout'
import WithErrorToast from '@/components/Layouts/WithErrorToast'
import RouteGuard from '@/components/RouteGuard'
import Spiner from '@/components/Spiner'

import { wrapper } from '@/store'

import { theme } from '@/common/theme'

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
    if (Component.requiredAdminRole && currentUser?.role === 'Reader') {
      router.back()
      return
    }

    if (currentUser) setIsLoadingPage(false)
    if (!currentUser && !pageProps.isAuth) setIsLoadingPage(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component.requiredAdminRole, currentUser])

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
        <WithErrorToast>
          <Layout isServerSideAuth={pageProps.isAuth}>
            <Component {...pageProps} />
          </Layout>
        </WithErrorToast>
      </Box>
      {/* </RouteGuard> */}
    </ChakraProvider>
  )
}

export default wrapper.withRedux(App)
