import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/authService'

import { IUpdateUser } from '@/types/models/IUser'

import {
  NotificationData,
  NotificationType,
  setNotification
} from '../notification'

interface ICredentials {
  email: string
  password: string
}

interface ISignUpCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: ICredentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.signIn(credentials)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        title: 'Ошибка входа',
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: ISignUpCredentials, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.signUp(credentials)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        title: 'Ошибка при регистрации',
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await authService.signOut()
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        title: 'Ошибка при выходе',
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.getCurrentUser()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)

export const getCurrentUserFromServerSide = createAsyncThunk(
  'auth/getCurrentUserFromServerSide',
  async (cookie, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.getCurrentUserWithCookie(cookie)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userInfo: IUpdateUser, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.updateUserInfo(userInfo)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)

export const changeAvatar = createAsyncThunk(
  'auth/changeAvatar',
  async (avatar: FormData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await authService.changeAvatar(avatar)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const notificationData: NotificationData = {
        message,
        type: NotificationType.Error
      }
      dispatch(setNotification(notificationData))
      return rejectWithValue(message)
    }
  }
)
