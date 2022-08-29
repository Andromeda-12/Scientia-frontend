import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { CustomAppProps } from '@/types/app'

import { useActions } from '@/hooks/useActoins'

import MainLayout from '@/components/Layouts/MainLayout'
import RouteGuard from '@/components/RouteGuard'

import { wrapper } from '@/store'
import { setAuth, setServerAuth } from '@/store/auth'

import { theme } from '@/common/theme'

function App({ Component, pageProps }: CustomAppProps) {
  const { getCurrentUser } = useActions()
  const dispatch = useDispatch()

  const Layout = Component.Layout || MainLayout

  console.log(pageProps.isAuth);
  

  useEffect(() => {
    if (pageProps.isAuth) {
      // dispatch(setServerAuth(true))
      getCurrentUser()
    }
  }, [getCurrentUser, pageProps.isAuth])

  return (
    <ChakraProvider theme={theme}>
      <RouteGuard isServerSideAuth={pageProps.isAuth}>
        <Layout isServerSideAuth={pageProps.isAuth}>
          <Component {...pageProps} />
        </Layout>
      </RouteGuard>
    </ChakraProvider>
  )
}

export default wrapper.withRedux(App)
