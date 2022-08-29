import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

import { LayoutProps } from '@/types/app'

const CenterLayout: FC<LayoutProps> = ({ children }) => (
  <Flex height='100vh' alignItems='center' justifyContent='center'>
    {children}
  </Flex>
)
export default CenterLayout
