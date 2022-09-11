import { IReviewRequest, IReviewUpdateRequest } from '@/types/models/IReview'

import instance from './instance'

export default class reviewService {
  static createReview = (review: IReviewRequest) =>
    instance.post('/review', review)

  static updateReview = (review: IReviewUpdateRequest) =>
    instance.put(`/review/${review.id}`, review)

  static getReviews = (bookId: number) =>
    instance.get('/review', { params: { bookId } })

  static getReview = (reviewId: number) => instance.get(`/review/${reviewId}`)
}
