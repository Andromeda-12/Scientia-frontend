import * as Yup from 'yup'

import { passwordMaxLength, passwordMinLength, phoneRegExp } from './constants'

export const signUpShemaForFirstStep = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(passwordMinLength)
    .max(passwordMaxLength),

  passwordConfirmation: Yup.string()
    .required('Field is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const signUpShemaForSecondStep = Yup.object({
  firstName: Yup.string().required('Name is required'),

  lastName: Yup.string().required('Last name is required'),

  phone: Yup.string()
    .required('Field is required')
    .matches(phoneRegExp, 'Phone number is not valid')
})

export const signInShema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .required('Password is required')
    .min(passwordMinLength)
    .max(passwordMaxLength)
})

export const changePasswordShema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(passwordMinLength)
    .max(passwordMaxLength),

  passwordConfirmation: Yup.string()
    .required('Field is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})
