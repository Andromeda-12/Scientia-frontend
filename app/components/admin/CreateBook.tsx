import { FC } from 'react'

import BookList from '../books/BookList'

interface CreateBookProps {}

const CreateBook: FC<CreateBookProps> = () => {
  return (
    <>
      <BookList />
    </>
  )
}
export default CreateBook
