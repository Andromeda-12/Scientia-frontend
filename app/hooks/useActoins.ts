import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { setCurrentBook } from '@/store/books'
import { getCurrentReview } from '@/store/reviews'
import { createReview, deleteReview, getReviews, updateReview } from '@/store/reviews/actions'

import {
  changeAvatar,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
  updateUserInfo
} from './../store/auth/actionCreators'
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  getSearchedBooks,
  takeBook,
  updateBookInfo
} from './../store/books/actions'
import {
  approveRecord,
  getApprovedRecords,
  getOverduedRecords,
  getPendingConfirmationRecords,
  getRecords,
  getUserRecords,
  rejectRecord,
  returnBook
} from './../store/record/actions'
import { assignRole, getUsers } from './../store/users/actions'
import { resetNotification, setNotification } from '@/store/notification'

const allActions = {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  updateUserInfo,
  createBook,
  getBooks,
  getBook,
  updateBookInfo,
  setCurrentBook,
  takeBook,
  createReview,
  updateReview,
  getReviews,
  getCurrentReview,
  getRecords,
  approveRecord,
  rejectRecord,
  getUsers,
  changeAvatar,
  assignRole,
  deleteBook,
  getUserRecords,
  getApprovedRecords,
  getPendingConfirmationRecords,
  getOverduedRecords,
  returnBook,
  getSearchedBooks,
  setNotification,
  resetNotification,
  deleteReview,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
