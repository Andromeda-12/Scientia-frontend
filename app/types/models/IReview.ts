import { IUser } from './IUser'

export interface IReview {
  id: number
  bookId: number
  text: string
  rating: number
  user: IUser
}

export interface IReviewRequest {
  bookId: number
  text: string
  rating: number
}

export interface IReviewUpdateRequest {
  id: number
  text: string
  rating: number
}
