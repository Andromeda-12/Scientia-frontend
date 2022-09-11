import { useCallback, useRef } from 'react'

const useDebounce = (callback: (...rest: any[]) => any, delay: number) => {
  const timer = useRef<NodeJS.Timeout>()

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timer.current) clearTimeout(timer.current)

      timer.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  return debouncedCallback
}

export default useDebounce
