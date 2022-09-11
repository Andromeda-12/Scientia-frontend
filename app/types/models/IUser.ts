export enum Roles {
  Reader = 'Reader',
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin'
}

export interface IUser {
  id: number
  email: string
  firstName: string
  lastName: string
  phone: string
  role: Roles
  decency: number
  overdueBooks: number
  readedBooks: number
  avatarUrl: string
}

export interface IUpdateUser {
  email: string
  firstName: string
  lastName: string
  phone: string
}
