import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { clearError } from '@/store/error'

interface WithErrorToastProps {
  children: ReactNode
}

const WithErrorToast: FC<WithErrorToastProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast()
  const toastIdRef = useRef<number | string | null>(null)
  const { isError, errorMessage, errorTitle } = useTypedSelector(
    (state) => state.error
  )

  useEffect(() => {
    if (isError) {
      toastIdRef.current = toast({
        title: errorTitle,
        description: errorMessage,
        position: 'bottom-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: handleClose
      })
    } else if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  const handleRouteChange = () => dispatch(clearError())

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => dispatch(clearError())

  return <>{children}</>
}

export default WithErrorToast
