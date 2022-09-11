import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface RowProps {
  children: ReactNode
  actions?: ReactNode
}

const Row: FC<RowProps> = ({ children, actions }) => {
  return (
    <Flex bg='gray.200' w='100%' h='60px'>
      <Flex>{children}</Flex>

      <Flex justifyContent='flex-end' alignItems='center'>
        {actions}
      </Flex>
    </Flex>
  )
}

export default Row
