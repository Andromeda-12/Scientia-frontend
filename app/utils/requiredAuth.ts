import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { wrapper } from '@/store'
import { getCurrentUserFromServerSide } from '@/store/auth/actionCreators'

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{
  [key: string]: any
}>
type IncomingGSSP<P> = (
  store: any,
  ctx: GetServerSidePropsContext
) => Promise<P>

const excludedRoutes = ['/sign-in', '/sign-up']

export function withCheckServerSideAuth(
  incomingGSSP?: IncomingGSSP<WithAuthServerSidePropsResult>
) {
  return wrapper.getServerSideProps((store) => async (context) => {
    let isAuth = false

    if (context.req.headers.cookie) {
      isAuth = true

      if (excludedRoutes.includes(context.resolvedUrl)) {
        return {
          redirect: { destination: '/profile', permanent: false }
        }
      }
    } else {
      // if (context.resolvedUrl !== '/sign-in') {
      //   console.log(
      //     context.req.rawHeaders.find((str) =>
      //       str.includes('http://localhost:3000')
      //     )
      //   )
      //   return {
      //     redirect: { destination: '/sign-in', permanent: false }
      //   }
      // }
    }

    if (incomingGSSP) {
      const incomingGSSPResult = await incomingGSSP(store, context)

      if (incomingGSSPResult && 'props' in incomingGSSPResult) {
        return { props: { ...incomingGSSPResult.props, isAuth } }
      }

      if (incomingGSSPResult && 'redirect' in incomingGSSPResult) {
        return {
          redirect: { ...incomingGSSPResult.redirect, isAuth }
        }
      }

      if (incomingGSSPResult && 'notFound' in incomingGSSPResult) {
        return {
          notFound: true
        }
      }
    }

    return {
      props: {
        isAuth
      }
    }
  })
}

// return wrapper.getServerSideProps((store) => async (context) => {
//   let isAuth = false
//   if (
//     context.req.headers.cookie &&
//     excludedRoutes.includes(context.resolvedUrl)
//   )
//     return {
//       redirect: { destination: '/profile', permanent: false }
//     }

//   if (!context.req.headers.cookie && context.resolvedUrl !== '/sign-in') {
//     return {
//       redirect: { destination: '/sign-in', permanent: false }
//     }
//   }

//   if (incomingGSSP) {
//     const incomingGSSPResult = await incomingGSSP(context)
//     if ('props' in incomingGSSPResult) {
//       return { props: { ...incomingGSSPResult.props, isAuth: true } }
//     }
//   }

//   return {
//     props: {
//       isAuth: false
//     }
//   }
// })
