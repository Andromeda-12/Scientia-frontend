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

export const recoveryPasswordShema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
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

export const createBookShema = Yup.object({
  title: Yup.string().required('Название книги обязательное'),
  description: Yup.string().required('Описание книги обязательное'),
  author: Yup.string().required('Укажите автора книги')
})

export const reviewShema = Yup.object({
  text: Yup.string().required('Текст отзыва обязателен')
})

export const updateUserShema = Yup.object({
  email: Yup.string().email('Некорректная почта').required('Укажите почту'),
  firstName: Yup.string().required('Укажите свое имя'),
  lastName: Yup.string().required('Укажите свою фамилию'),
  phone: Yup.string()
    .required('Укажите свой номер телефона')
    .matches(phoneRegExp, 'Некорректный номер телефона')
})

export const updateBookShema = Yup.object({
  title: Yup.string().required('Укажите название книги'),
  description: Yup.string().required('Укажите описание книги'),
  author: Yup.string().required('Укажите автора книги')
})
