import { Roles } from '@/types/models/IUser'

import instance from './instance'

interface RolesData {
  id: number
  role: Roles
}

export default class userService {
  static getUsers = () => instance.get('/user')

  static assignRole = (data: RolesData) => instance.post('/role', data)
}
