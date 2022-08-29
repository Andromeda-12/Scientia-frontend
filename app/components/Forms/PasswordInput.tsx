import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { IconButton, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FC, useState } from 'react'

import Input, { InputTypes } from './Input'

interface PasswordInputProps {
  placeholder: string
  field: any
}

const PasswordInput: FC<PasswordInputProps> = ({ placeholder, field }) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup>
      <Input
        field={field}
        placeholder={placeholder}
        type={show ? InputTypes.text : InputTypes.password}
      />
      <InputRightElement>
        <IconButton
          size='sm'
          aria-label='Call Sage'
          rounded='50%'
          fontSize='20px'
          color='primary.main'
          bg='transparent'
          _hover={{
            bg: 'transparent',
            color: 'primary.hover'
          }}
          onClick={handleClick}
          icon={show ? <ViewIcon /> : <ViewOffIcon />}
        />
      </InputRightElement>
    </InputGroup>
  )
}
export default PasswordInput
