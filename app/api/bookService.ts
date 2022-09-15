import { IBook, ICreateBook, IUpdateBook } from './../types/models/IBook'
import { IRecord } from './../types/models/IRecord'
import instance from './instance'

export default class bookService {
  static createBook = (book: ICreateBook) =>
    instance.post<IBook>('/book', book)

  static updateCover = (bookId: number, cover: FormData) =>
    instance.patch<IBook>(`/book/${bookId}/changeCover`, cover)

  static deleteBook = (bookId: number) => instance.delete(`/book/${bookId}`)

  static getBooks = () => instance.get('/book')

  static getSearchedBooks = (title: string) =>
    instance.get('/book', { params: { title } })

  static getBook = (bookId: number) => instance.get(`/book/${bookId}`)

  static updateBookInfo = (book: IUpdateBook) =>
    instance.patch<IBook>(`/book/${book.id}`, book)

  static takeBook = (book: { bookId: number }) =>
    instance.post<IRecord>(`/record`, book)
}
