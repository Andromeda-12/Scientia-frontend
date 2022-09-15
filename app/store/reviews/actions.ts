import { createAsyncThunk } from '@reduxjs/toolkit'
import reviewService from 'api/reviewService'

import { IReviewRequest } from '@/types/models/IReview'

import {
  NotificationData,
  NotificationType,
  setNotification
} from '../notification'

import { IReviewUpdateRequest } from './../../types/models/IReview'

export const getReviews = createAsyncThunk(
  'review/getReviews',
  async (bookId: number, { rejectWithValue }) => {
    try {
      const { data } = await reviewService.getReviews(bookId)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const createReview = createAsyncThunk(
  'review/createReview',
  async (review: IReviewRequest, { rejectWithValue }) => {
    try {
      const { data } = await reviewService.createReview(review)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const updateReview = createAsyncThunk(
  'review/updateReview',
  async (review: IReviewUpdateRequest, { rejectWithValue }) => {
    try {
      const { data } = await reviewService.updateReview(review)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const deleteReview = createAsyncThunk(
  'review/deleteReview',
  async (reviewId: number, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await reviewService.deleteReview(reviewId)
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
