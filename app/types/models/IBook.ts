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

export interface ICreateBook {
  title: string
  description: string
  author: string
  count: number
}

export interface ICreateBookData {
  book: ICreateBook
  cover: FormData | undefined
}

export interface IUpdateBook {
  id: number
  title: string
  description: string
  author: string
  count: number
}

export interface IUpdateBookData {
  book: IUpdateBook
  cover: FormData | undefined
}
