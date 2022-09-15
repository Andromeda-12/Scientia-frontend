import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type NotificationData = {
  title?: string
  message: string
  type: NotificationType
}

export enum NotificationType {
  Error = 'error',
  Notification = 'success',
  Info = 'info',
  Warning = 'warning',
  Loading = 'loading'
}

interface IInitialState {
  isNotification: boolean
  message: string
  title: string
  type: NotificationType | null
}

const initialState: IInitialState = {
  isNotification: false,
  message: '',
  title: '',
  type: null
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, { payload }: PayloadAction<NotificationData>) {
      state.message = payload.message
      state.type = payload.type

      if (!payload.title) {
        switch (payload.type) {
          case NotificationType.Error:
            state.title = 'Ошибка'
            break

          default:
            state.title = 'Заголовок уведомления'
            break
        }
      } else {
        state.title = payload.title
      }

      state.isNotification = true
    },
    resetNotification(state) {
      state.message = ''
      state.title = ''
      state.isNotification = false
      state.type = null
    }
  }
})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
