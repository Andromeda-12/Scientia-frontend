import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import authReducer from '@/store/auth'
import bookReducer from '@/store/books'
import errorReducer from '@/store/error'
import recordReducer from '@/store/record'
import reviewReducer from '@/store/reviews'
import usersReducer from '@/store/users'

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  review: reviewReducer,
  record: recordReducer,
  users: usersReducer,
  error: errorReducer
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer
  })

export type RootSate = ReturnType<typeof rootReducer>

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper(makeStore, {
  debug: false,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state)
})
