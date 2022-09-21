import { emailRegex, passwordRegex, phoneRegExp } from './constants'

export const isEmpty = (val: string) => !val
export const minLength = (num: number) => (val: string) => val.length >= num
export const maxLength = (num: number) => (val: string) => val.length <= num
export const isValidEmail = (email: string) => !!email.toLowerCase().match(emailRegex)
export const isValidPassword = (password: string) => !!password.match(passwordRegex)
export const isPasswordMatch = (password: string, repeatPassword: string) => password === repeatPassword
export const isValidPhone = (phone: string) => phone.match(phoneRegExp)
