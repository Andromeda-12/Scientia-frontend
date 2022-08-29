import { Center, Flex, Heading } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

interface BaseFormProps {
  children: ReactNode
  title: string
}

const BaseForm: FC<BaseFormProps> = ({ children, title }) => {
  return (
    <Flex
      direction='column'
      width='420px'
      background='secondary.main'
      borderColor='primary.main'
      border='2px solid'
      p={8}
      py={12}
    >
      <Center>
        <Heading color='text.black' mb={6}>
          {title}
        </Heading>
      </Center>

      {children}
    </Flex>
  )
}
export default BaseForm
