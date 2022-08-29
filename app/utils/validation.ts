import {
  isEmpty,
  isPasswordMatch,
  isValidEmail,
  isValidPassword
} from '@/common/rules'

export const validateEmail = (value: string): string => {
  let error = ''
  if (isEmpty(value)) error = 'Email is required'
  if (!isValidEmail(value)) error = 'Invalid Email'
  return error
}

export const validatePassword = (value: string): string => {
  let error = ''
  if (isEmpty(value)) error = 'Password is required'
  if (!isValidPassword(value)) error = 'Invalid password'
  return error
}

export const repeatPpassword = (
  password: string,
  repeatedPassword: string
): string => {
  let error = ''
  if (isEmpty(repeatedPassword)) error = 'Field is required'
  if (!isPasswordMatch(password, repeatedPassword))
    error = 'Passwords do not match'
  return error
}
