import Link from 'next/link'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'
import { IBook } from '@/types/models/IBook'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import BookList from '@/components/books/BookList'

import { wrapper } from '@/store'
import { getBooks } from '@/store/books/actions'

const BooksPage: Page<{ books: IBook[] }> = () => {
  return <BookList />
}

// BooksPage.requiredAdminRole = true

export const getServerSideProps = withCheckServerSideAuth(async (store) => {
  await store.dispatch(getBooks())
  return { props: {} }
})

// BooksPage.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async (ctx) => {
//     await store.dispatch(getBooks())
//     return {}
//   }
// )

export default BooksPage
