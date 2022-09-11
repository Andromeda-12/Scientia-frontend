import { createAsyncThunk } from '@reduxjs/toolkit'
import bookService from 'api/bookService'

import { ResponseError, setError } from '../error'

import { IBookRequest, IUpdateBook } from './../../types/models/IBook'

export const createBook = createAsyncThunk(
  'book/createBook',
  async (book: IBookRequest, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await bookService.createBook(book)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      const responseError: ResponseError = {
        message,
        title: 'Create book error'
      }
      dispatch(setError(responseError))
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
      const responseError: ResponseError = {
        message,
        title: 'Delete book error'
      }
      dispatch(setError(responseError))
      return rejectWithValue(message)
    }
  }
)

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await bookService.getBooks()
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getSearchedBooks = createAsyncThunk(
  'book/getSearchedBooks',
  async (title: string, { rejectWithValue }) => {
    try {
      const { data } = await bookService.getSearchedBooks(title)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const getBook = createAsyncThunk(
  'book/getBook',
  async (bookId: number, { rejectWithValue }) => {
    try {
      const { data } = await bookService.getBook(bookId)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const takeBook = createAsyncThunk(
  'book/takeBook',
  async (book: { bookId: number }, { rejectWithValue }) => {
    try {
      const { data } = await bookService.takeBook(book)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const updateBookInfo = createAsyncThunk(
  'book/updateBookInfo',
  async (book: IUpdateBook, { rejectWithValue }) => {
    try {
      const { data } = await bookService.updateBookInfo(book)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)

export const uploadBookСover = createAsyncThunk(
  'book/uploadBookСover',
  async (bookCover: FormData, { rejectWithValue }) => {
    try {
      const { data } = await bookService.uploadBookСover(bookCover)
      return data
    } catch (error: any) {
      const message = error.response.data.message
      return rejectWithValue(message)
    }
  }
)
