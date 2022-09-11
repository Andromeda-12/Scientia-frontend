import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface ColumnProps {
  children: ReactNode
}

const Column: FC<ColumnProps> = ({ children }) => {
  return (
    <Flex px={4} h='100%' alignItems='center'>
      {children}
    </Flex>
  )
}

export default Column
