import { createAsyncThunk } from '@reduxjs/toolkit'
import recordService from 'api/recordService'

import {
  NotificationData,
  NotificationType,
  setNotification
} from '../notification'

export const getRecords = createAsyncThunk(
  'record/getRecords',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await recordService.getRecords()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getUserRecords = createAsyncThunk(
  'record/getUserRecords',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await recordService.getUserRecords()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getApprovedRecords = createAsyncThunk(
  'record/getApprovedRecords',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await recordService.getApprovedRecords()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getPendingConfirmationRecords = createAsyncThunk(
  'record/getPendingConfirmationRecords',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await recordService.getPendingConfirmation()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getOverduedRecords = createAsyncThunk(
  'record/getOverduedRecords',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await recordService.getOverduedRecords()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const approveRecord = createAsyncThunk(
  'record/approveRecord',
  async (recordId: number, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await recordService.approveRecord(recordId)
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

export const returnBook = createAsyncThunk(
  'record/returnBook',
  async (recordId: number, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await recordService.returnBook(recordId)
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

export const rejectRecord = createAsyncThunk(
  'record/rejectRecord',
  async (recordId: number, { rejectWithValue }) => {
    try {
      const { data } = await recordService.rejectRecord(recordId)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)
