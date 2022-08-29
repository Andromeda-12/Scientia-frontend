import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'

import { useTypedSelector } from '@/hooks/useTypedSelector'

interface RouteGuardProps {
  children: ReactNode
  isServerSideAuth: boolean
}

const excludedRoutes = ['/sign-in', '/sign-up']

const RouteGuard: FC<RouteGuardProps> = ({ children, isServerSideAuth }) => {
  const { isAuth } = useTypedSelector((store) => store.auth)
  const router = useRouter()

  useEffect(() => {
    if (isServerSideAuth === undefined) return

    if (!isAuth && !isServerSideAuth && router.asPath !== '/sign-in') {
      router.push({
        pathname: '/sign-in'
      })
    }
  }, [isAuth])

  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      if (excludedRoutes.includes(url) && isServerSideAuth) {
        router.push({
          pathname: '/profile'
        })
      }
    })
  }, [])

  return <>{children}</>
}

export default RouteGuard
