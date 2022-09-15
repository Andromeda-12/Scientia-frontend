import { IBook } from './IBook'
import { IUser } from './IUser'

export interface IRecord {
  id: number
  bookCount: number
  user: IUser
  book: IBook
  isIssued: boolean
  isReturned: boolean
  isOverdue: boolean
  factReturningDate: string
  recievingDate: string
  returningDate: string
}
