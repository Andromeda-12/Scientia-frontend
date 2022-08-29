import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { getCurrentUser, signIn, signOut, signUp } from './../store/auth/actionCreators'

const allActions = {
  signIn,
  signUp,
  signOut,
  getCurrentUser
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}
