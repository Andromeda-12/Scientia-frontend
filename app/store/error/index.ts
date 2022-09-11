import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type ResponseError = {
  message: string
  title: string
}

interface IInitialState {
  isError: boolean
  errorMessage: string
  errorTitle: string
}

const initialState: IInitialState = {
  isError: false,
  errorMessage: '',
  errorTitle: ''
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, { payload }: PayloadAction<ResponseError>) {
      state.errorMessage = payload.message
      state.errorTitle = payload.title
      state.isError = true
    },
    clearError(state) {
      state.errorMessage = ''
      state.errorTitle = ''
      state.isError = false
    }
  }
})

export const { setError, clearError } = errorSlice.actions
export default errorSlice.reducer
