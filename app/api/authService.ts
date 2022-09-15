import { IUpdateUser, IUser } from './../types/models/IUser'
// import { ISignInCredentials, ISignUpCredentials } from '@/types/models'
// import { IUser } from './../types/models/index'
import instance from './instance'

export default class authService {
  static signIn = (credentials) => instance.post('/auth/signIn', credentials)

  static signUp = (credentials) => instance.post('/auth/signUp', credentials)

  static signOut = () => instance.post('/auth/signOut')

  static refresh = () => instance.get('/auth/refresh')

  static getCurrentUser = () => instance.get('/user/currentUser')

  static updateUserInfo = (userInfo: IUpdateUser) =>
    instance.patch<IUser>('/user', userInfo)

  static checkToken = (token: string) =>
    instance.get(`/auth/checkRecoveryToken/${token}`)

  static restorePassword = (restorePasswordData: {
    token: string
    password: string
  }) => instance.post('/auth/recovery-password', restorePasswordData)

  static sendPasswordRecoveryEmail = (email: string) =>
    instance.post('/auth/forget-password', { email })

  static changeAvatar = (avatar: FormData) =>
    instance.patch<IUser>('/user/changeAvatar', avatar)

  static getCurrentUserWithCookie = (cookie) =>
    instance.get<IUser>('/user/currentUser', {
      withCredentials: true,
      headers: {
        Cookie: cookie
      }
    })
}
