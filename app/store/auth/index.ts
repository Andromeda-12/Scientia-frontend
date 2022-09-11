import { createSlice } from '@reduxjs/toolkit'

import { IUser } from './../../types/models/IUser'
import {
  changeAvatar,
  getCurrentUser,
  getCurrentUserFromServerSide,
  signIn,
  signOut,
  signUp,
  updateUserInfo
} from './actionCreators'

interface IInitialState {
  isAuth: boolean | undefined
  isServerAuth: boolean | undefined
  isLoading: boolean
  currentUser?: IUser | null
}

const initialState: IInitialState = {
  isAuth: undefined,
  isServerAuth: false,
  isLoading: false,
  currentUser: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
    })

    builder.addCase(signOut.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuth = false
      state.currentUser = null
    })
    builder.addCase(signOut.rejected, (state, { payload }) => {
      state.isLoading = false
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
    })

    builder.addCase(getCurrentUserFromServerSide.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getCurrentUserFromServerSide.fulfilled,
      (state, { payload }) => {
        state.isLoading = false
        state.isAuth = true
        state.currentUser = payload
      }
    )
    builder.addCase(
      getCurrentUserFromServerSide.rejected,
      (state, { payload }) => {
        state.isLoading = false
        state.isAuth = false
        state.currentUser = undefined
      }
    )

    builder.addCase(updateUserInfo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currentUser = payload
    })
    builder.addCase(updateUserInfo.rejected, (state, { payload }) => {
      state.isLoading = false
    })

    builder.addCase(changeAvatar.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(changeAvatar.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.currentUser = payload
    })
    builder.addCase(changeAvatar.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  }
})

export const { setAuth, setServerAuth } = authSlice.actions
export default authSlice.reducer
