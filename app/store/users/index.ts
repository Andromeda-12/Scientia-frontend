import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/models/IUser'

import { assignRole, getUsers } from './actions'

interface IInitialState {
  isLoading: boolean
  users: IUser[]
  error: string
}

const initialState: IInitialState = {
  isLoading: false,
  users: [],
  error: ''
}

export const userslice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.users = payload
    })
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(assignRole.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(assignRole.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const updatedUser = state.users.map(review => ({...review}))
      let foundIndex = updatedUser.findIndex(user => user.id === payload.id);
      updatedUser[foundIndex] = payload
      state.users = updatedUser
    })
    builder.addCase(assignRole.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
  }
})

// export const { getCurrentReview } = userslice.actions
export default userslice.reducer
