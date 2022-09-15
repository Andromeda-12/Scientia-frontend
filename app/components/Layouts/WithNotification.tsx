import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import { resetNotification } from '@/store/notification'

interface WithNotificationProps {
  children: ReactNode
}

const WithNotification: FC<WithNotificationProps> = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const toast = useToast()
  const toastIdRef = useRef<number | string | null>(null)
  const { isNotification, message, type, title } = useTypedSelector(
    (state) => state.notification
  )

  const handleResetNotification = () => dispatch(resetNotification())

  useEffect(() => {
    if (isNotification) {
      toastIdRef.current = toast({
        title: title,
        description: message,
        position: 'bottom-right',
        status: type || undefined,
        duration: 5000,
        isClosable: true,
        onCloseComplete: handleResetNotification
      })
    } else if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotification])

  useEffect(() => {
    router.events.on('routeChangeStart', handleResetNotification)

    return () => {
      router.events.off('routeChangeStart', handleResetNotification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}

export default WithNotification
