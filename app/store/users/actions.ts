import { createAsyncThunk } from '@reduxjs/toolkit'
import userService from 'api/userService'

import { Roles } from '@/types/models/IUser'

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userService.getUsers()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const assignRole = createAsyncThunk(
  'user/assignRole',
  async (rolesData: { id: number; role: Roles }, { rejectWithValue }) => {
    try {
      const { data } = await userService.assignRole(rolesData)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)
