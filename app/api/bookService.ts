import { IBookRequest } from '@/types/models/IBook'

import { IUpdateBook } from './../types/models/IBook'
import instance from './instance'

export default class bookService {
  static createBook = (book: IBookRequest) => instance.post('/book', book)

  static deleteBook = (bookId: number) => instance.delete(`/book/${bookId}`)

  static getBooks = () => instance.get('/book')

  static getSearchedBooks = (title: string) =>
    instance.get('/book', { params: { title } })

  static getBook = (bookId: number) => instance.get(`/book/${bookId}`)

  static updateBookInfo = (book: IUpdateBook) =>
    instance.patch(`/book/${book.id}`, book)

  static uploadBookСover = (bookCover: FormData) =>
    instance.patch(`/book/${bookCover.id}/${bookCover}`)

  static takeBook = (book: { bookId: number }) => instance.post(`/record`, book)
}
