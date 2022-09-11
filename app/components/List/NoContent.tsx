import { Flex, Icon, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { ReactNode } from 'react'
import { IconType } from 'react-icons'

export type NoContentProps = {
  text: string
  icon?: IconType
  children?: ReactNode
  noShadow?: boolean
}

const NoContent: FC<NoContentProps> = ({
  icon,
  text,
  children,
  noShadow,
  ...other
}) => {
  return (
    <Flex
      mt='8'
      mb='12'
      p='10'
      {...other}
      borderRadius='8'
      direction='column'
      align='center'
      justify='center'
      border='2px solid black'
      boxShadow={noShadow ? 'unset' : 'sm'}
    >
      {icon && (
        <Flex
          p='6'
          align='center'
          justify='baseline'
          borderRadius='full'
          bg='gray.50'
        >
          <Icon as={icon} fontSize='24' color='teal.700' />
        </Flex>
      )}

      <Text mt='4'>{text}</Text>

      {children}
    </Flex>
  )
}

export default NoContent