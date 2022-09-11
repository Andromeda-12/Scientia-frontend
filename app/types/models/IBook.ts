export interface IBook {
  id: number
  title: string
  description: string
  inStock: number
  count: number
  coverUrl: string
  isNew: boolean
  rating: number
  author: string
  countReviews: number
}

export interface IBookRequest {
  title: string
  description: string
  count: number
}

export interface IUpdateBook {
  id: number
  title: string
  description: string
  author: string
  count: number
}
