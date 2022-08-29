import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import { FC } from 'react'

import Input, { InputTypes } from './Input'
import PasswordInput from './PasswordInput'

interface FormFieldProps {
  name: string
  errorMessage: string
  isInvalid: boolean
  isRequired?: boolean
  field: any
  tel?: boolean
  password?: boolean
  placeholder?: string
}

interface PlugProps {
  show: boolean
}

const Plug: FC<PlugProps> = ({ show }) => {
  if (show) return <div style={{ height: '18.4px', marginTop: '3px' }}></div>
  else return <></>
}

const FormField: FC<FormFieldProps> = ({
  name,
  isInvalid,
  isRequired,
  field,
  errorMessage,
  tel,
  password,
  placeholder
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} mb={1}>
      <FormLabel>{name}</FormLabel>
      <InputGroup>
        {/* {tel &&
          (isInvalid ? (
            <InputLeftAddon
              backgroundColor='gray.200'
              borderColor='red'
              border='2px'
              p={2}
            >
              +
            </InputLeftAddon>
          ) : (
            <InputLeftAddon
              backgroundColor='gray.200'
              borderRightColor='gray.300'
              borderRightWidth='2px'
            >
              +
            </InputLeftAddon>
          ))} */}

        {password && <PasswordInput field={field} placeholder={name} />}

        {!password && (
          <Input
            type={InputTypes.text}
            placeholder={placeholder || name}
            field={field}
          />
        )}
      </InputGroup>

      <FormErrorMessage mt='3px'>{errorMessage}</FormErrorMessage>
      <Plug show={!isInvalid} />
    </FormControl>
  )
}
export default FormField
