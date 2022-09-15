import { createSlice } from '@reduxjs/toolkit'

import { IReview } from '@/types/models/IReview'

import './actions'
import { createReview, deleteReview, getReviews, updateReview } from './actions'

interface IInitialState {
  isLoading: boolean
  reviews: IReview[]
  currentReview: IReview
  error: string
}

const initialState: IInitialState = {
  isLoading: false,
  reviews: [],
  currentReview: {} as IReview,
  error: ''
}

export const bookSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    getCurrentReview(state, { payload: reviewId }) {
      const currentReview = state.reviews.find(
        (review) => review.id === reviewId
      )
      if (currentReview) state.currentReview = currentReview
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getReviews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getReviews.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.reviews = payload
    })
    builder.addCase(getReviews.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
    builder.addCase(createReview.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(createReview.fulfilled, (state, { payload }) => {
      state.isLoading = false
      const tempState = [...state.reviews]
      tempState.unshift(payload)
      state.reviews = tempState
    })
    builder.addCase(createReview.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(updateReview.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      updateReview.fulfilled,
      (state, { payload }: { payload: IReview }) => {
        state.isLoading = false
        const updatedReviews = state.reviews.map((review) => ({ ...review }))
        let foundIndex = updatedReviews.findIndex(
          (review) => review.id === payload.id
        )
        updatedReviews[foundIndex] = payload
        state.reviews = updatedReviews
      }
    )
    builder.addCase(updateReview.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })

    builder.addCase(deleteReview.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      deleteReview.fulfilled,
      (state, { payload }: { payload: IReview }) => {
        state.isLoading = false
        const updatedReviews = state.reviews.map((review) => ({ ...review }))
        let foundIndex = updatedReviews.findIndex(
          (review) => review.id === payload.id
        )
        updatedReviews.splice(foundIndex, 1)
        state.reviews = updatedReviews
      }
    )
    builder.addCase(deleteReview.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = payload as string
    })
  }
})

export const { getCurrentReview } = bookSlice.actions
export default bookSlice.reducer
