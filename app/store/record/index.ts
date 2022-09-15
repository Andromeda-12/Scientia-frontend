import { createSlice } from '@reduxjs/toolkit'

import { IRecord } from '@/types/models/IRecord'

import {
  approveRecord,
  getApprovedRecords,
  getOverduedRecords,
  getPendingConfirmationRecords,
  getRecords,
  getUserRecords,
  rejectRecord,
  returnBook
} from './actions'

interface IInitialState {
  isLoading: boolean
  records: IRecord[]
  userRecords: IRecord[]
  approvedRecords: IRecord[]
  overduedRecords: IRecord[]
  pendingConfirmationRecords: IRecord[]
  error: string
}

const initialState: IInitialState = {
  isLoading: false,
  records: [],
  approvedRecords: [],
  overduedRecords: [],
  pendingConfirmationRecords: [],
  userRecords: [],
  error: ''
}

export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRecords.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getRecords.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.records = payload
    })
    builder.addCase(getRecords.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(getApprovedRecords.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getApprovedRecords.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.approvedRecords = payload
    })
    builder.addCase(getApprovedRecords.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(getPendingConfirmationRecords.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      getPendingConfirmationRecords.fulfilled,
      (state, { payload }) => {
        state.isLoading = false
        state.pendingConfirmationRecords = payload
      }
    )
    builder.addCase(
      getPendingConfirmationRecords.rejected,
      (state, { payload }) => {
        state.isLoading = false
        state.error = payload as string
      }
    )

    builder.addCase(getOverduedRecords.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getOverduedRecords.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.overduedRecords = payload
    })
    builder.addCase(getOverduedRecords.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(getUserRecords.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getUserRecords.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.userRecords = payload
    })
    builder.addCase(getUserRecords.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(approveRecord.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(approveRecord.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const foundIndex = state.pendingConfirmationRecords.findIndex(
        (record) => record.id === payload.id
      )
      state.pendingConfirmationRecords.splice(foundIndex, 1)
      state.approvedRecords.push(payload)
    })
    builder.addCase(approveRecord.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(rejectRecord.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(rejectRecord.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const foundIndex = state.pendingConfirmationRecords.findIndex(
        (record) => record.id === payload.id
      )
      state.pendingConfirmationRecords.splice(foundIndex, 1)
    })
    builder.addCase(rejectRecord.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(returnBook.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(returnBook.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const foundIndex = state.approvedRecords.findIndex(
        (record) => record.id === payload.id
      )
      state.approvedRecords.splice(foundIndex, 1)

      const foundIndex2 = state.overduedRecords.findIndex(
        (record) => record.id === payload.id
      )
      state.overduedRecords.splice(foundIndex2, 1)
    })
    builder.addCase(returnBook.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
  }
})

export default recordSlice.reducer
