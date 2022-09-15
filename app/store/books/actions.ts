import { createAsyncThunk } from '@reduxjs/toolkit'
import bookService from 'api/bookService'

import { IBook, ICreateBookData, IUpdateBookData } from '@/types/models/IBook'

import {
  NotificationData,
  NotificationType,
  setNotification
} from '../notification'

export const createBook = createAsyncThunk(
  'book/createBook',
  async (createBookData: ICreateBookData, { rejectWithValue, dispatch }) => {
    try {
      let createdBook: IBook | null = null

      const createResponse = await bookService.createBook(createBookData.book)
      createdBook = createResponse.data

      if (createBookData.cover) {
        const updateCoverResponse = await bookService.updateCover(
          createdBook.id,
          createBookData.cover
        )
        createdBook = updateCoverResponse.data
      }

      return createdBook
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

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (bookId: number, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await bookService.deleteBook(bookId)
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

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await bookService.getBooks()
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

export const getSearchedBooks = createAsyncThunk(
  'book/getSearchedBooks',
  async (title: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await bookService.getSearchedBooks(title)
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

export const getBook = createAsyncThunk(
  'book/getBook',
  async (bookId: number, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await bookService.getBook(bookId)
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

export const takeBook = createAsyncThunk(
  'book/takeBook',
  async (book: { bookId: number }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await bookService.takeBook(book)
      const notificationData: NotificationData = {
        title: 'Уведомление',
        message: 'Вы взяли книгу',
        type: NotificationType.Notification
      }
      dispatch(setNotification(notificationData))
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

export const updateBookInfo = createAsyncThunk(
  'book/updateBookInfo',
  async (updateBookData: IUpdateBookData, { rejectWithValue, dispatch }) => {
    try {
      let updatedBook: IBook | null = null

      const updateResponse = await bookService.updateBookInfo(
        updateBookData.book
      )
      updatedBook = updateResponse.data

      if (updateBookData.cover) {
        const updateCoverResponse = await bookService.updateCover(
          updatedBook.id,
          updateBookData.cover
        )
        updatedBook = updateCoverResponse.data
      }

      return updatedBook
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
