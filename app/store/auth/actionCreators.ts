import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from 'api/authService'

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
      return rejectWithValue(message)
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials: ISignUpCredentials, { rejectWithValue }) => {
    try {
      const { data } = await authService.signUp(credentials)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await authService.signOut()
      localStorage.removeItem('isAuth')
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.getCurrentUser()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)
