import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import authReducer from '@/store/auth'

const rootReducer = combineReducers({
  auth: authReducer
})

export const makeStore = () =>
  configureStore({
    reducer: rootReducer
  })

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
