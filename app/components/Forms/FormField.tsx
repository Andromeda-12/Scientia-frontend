import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Textarea
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
  title?: string
  tel?: boolean
  password?: boolean
  placeholder?: string
  textarea?: boolean
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
  title,
  errorMessage,
  password,
  placeholder,
  textarea
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={isInvalid} mb={1}>
      <FormLabel>{title}</FormLabel>
      <InputGroup>
        {password && <PasswordInput field={field} placeholder={name} />}

        {textarea && (
          <Textarea {...field} placeholder={placeholder} size='sm' minH='150px' />
        )}

        {!password && !textarea && (
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
