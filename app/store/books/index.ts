import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { HYDRATE } from 'next-redux-wrapper'

import { IBook } from './../../types/models/IBook'
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  getSearchedBooks,
  takeBook,
  updateBookInfo,
} from './actions'

interface IInitialState {
  isLoading: boolean
  books: IBook[]
  searchedBooks: IBook[]
  currentBook: IBook
  error: string
  isHydrated: boolean
}

const initialState: IInitialState = {
  isLoading: false,
  books: [],
  searchedBooks: [],
  currentBook: {} as IBook,
  error: '',
  isHydrated: false
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCurrentBook(state, { payload }) {
      state.currentBook = payload
    },
    setBooks(state, { payload }) {
      state.books = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload }) => {
      if (_.isEqual(state.currentBook, payload.book.currentBook)) return
      if (_.isEqual(_.cloneDeep(state.currentBook), payload.book.books)) return

      state.books = payload.book.books
      state.currentBook = payload.book.currentBook
    })
    builder.addCase(getBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.books = payload
    })
    builder.addCase(getBooks.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
    builder.addCase(createBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.books.push(payload)
    })
    builder.addCase(createBook.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
    builder.addCase(getBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currentBook = payload
    })
    builder.addCase(getBook.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(takeBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currentBook = payload.book
    })
    builder.addCase(takeBook.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(updateBookInfo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateBookInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currentBook = payload
    })
    builder.addCase(updateBookInfo.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(deleteBook.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(deleteBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const updatedBooks = state.books.map((book) => ({ ...book }))
      let foundIndex = updatedBooks.findIndex((book) => book.id === payload.id)
      updatedBooks.splice(foundIndex, 1)
      state.books = updatedBooks
    })
    builder.addCase(deleteBook.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(getSearchedBooks.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSearchedBooks.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.searchedBooks = payload
    })
    builder.addCase(getSearchedBooks.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
  }
})

export const { setCurrentBook, setBooks } = bookSlice.actions
export default bookSlice.reducer
