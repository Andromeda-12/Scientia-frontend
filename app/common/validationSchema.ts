import * as Yup from 'yup'

import { passwordMaxLength, passwordMinLength, phoneRegExp } from './constants'

export const signUpShemaForFirstStep = Yup.object({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),

  password: Yup.string()
    .required('Введите пароль')
    .min(passwordMinLength)
    .max(passwordMaxLength),

  passwordConfirmation: Yup.string()
    .required('Поле обязательное')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})

export const signUpShemaForSecondStep = Yup.object({
  firstName: Yup.string().required('Введите имя'),

  lastName: Yup.string().required('Введите фамилию'),

  phone: Yup.string()
    .required('Поле обязательное')
    .matches(phoneRegExp, 'Некорректный номер телефона')
})

export const signInShema = Yup.object({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту'),

  password: Yup.string()
    .required('Введите пароль')
    .min(passwordMinLength)
    .max(passwordMaxLength)
})

export const recoveryPasswordShema = Yup.object({
  email: Yup.string()
    .email('Некорректная почта')
    .required('Введите почту')
})

export const changePasswordShema = Yup.object({
  password: Yup.string()
    .required('Введите пароль')
    .min(passwordMinLength)
    .max(passwordMaxLength),

  passwordConfirmation: Yup.string()
    .required('Поле обязательное')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
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
