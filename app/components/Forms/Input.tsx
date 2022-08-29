import { Input as ChakraInput } from '@chakra-ui/react'
import { FC } from 'react'

export enum InputTypes {
  text = 'text',
  tel = 'tel',
  password = 'password'
}

interface InputProps {
  type?: InputTypes
  field: any
  placeholder: string
}

const Input: FC<InputProps> = ({ type, field, placeholder }) => {
  const getInputType = () => {
    switch (type) {
      case InputTypes.tel:
        return InputTypes.tel

      case InputTypes.password:
        return InputTypes.password

      default:
        return InputTypes.text
    }
  }

  return (
    <ChakraInput
      {...field}
      placeholder={placeholder}
      p='5px'
      type={getInputType()}
      focusBorderColor='primary.main'
    />
  )
}

export default Input
