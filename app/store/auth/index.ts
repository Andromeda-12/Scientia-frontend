import { createSlice } from '@reduxjs/toolkit'

import { IUser } from './../../types/models/IUser'
import { getCurrentUser, signIn, signOut, signUp } from './actionCreators'

interface IInitialState {
  isAuth: boolean | undefined
  isServerAuth: boolean | undefined
  isLoading: boolean
  currentUser?: IUser
  getCurrentUserError: string
  signInError: string
  signUpError: string
  signOutError: string
}

const initialState: IInitialState = {
  isAuth: undefined,
  isServerAuth: false,
  isLoading: false,
  currentUser: undefined,
  getCurrentUserError: '',
  signInError: '',
  signUpError: '',
  signOutError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSignInError: (state) => {
      state.signInError = ''
    },
    clearSignUpError: (state) => {
      state.signUpError = ''
    },
    clearSignOutError: (state) => {
      state.signOutError = ''
    },
    clearGetCurrentUserError: (state) => {
      state.getCurrentUserError = ''
    },
    setAuth: (state, { payload }) => {
      state.isAuth = payload
    },
    setServerAuth: (state, { payload }) => {
      state.isServerAuth = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isAuth = true
      state.isLoading = false
      console.log(payload)
      state.currentUser = payload
    })
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = false
      state.currentUser = undefined
      state.signInError = payload as string
    })

    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = true
      state.currentUser = payload
    })
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = false
      state.currentUser = undefined
      state.signUpError = payload as string
    })

    builder.addCase(signOut.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = false
      state.currentUser = undefined
    })
    builder.addCase(signOut.rejected, (state, { payload }) => {
      state.isLoading = false
      state.signUpError = payload as string
    })

    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = true
      state.currentUser = payload
    })
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = false
      state.currentUser = undefined
      state.getCurrentUserError = payload as string
    })
  }
})

export const {
  clearSignInError,
  clearSignUpError,
  clearSignOutError,
  clearGetCurrentUserError,
  setAuth,
  setServerAuth
} = authSlice.actions
export default authSlice.reducer
