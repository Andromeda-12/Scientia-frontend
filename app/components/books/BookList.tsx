import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { IBook } from '@/types/models/IBook'
import { Roles } from '@/types/models/IUser'

import { useActions } from '@/hooks/useActoins'
import useDebounce from '@/hooks/useDebounce'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { getBooks } from '@/store/books/actions'

import CreateBookModal from '../Modal/CreateBookModal'
import SearchBook from '../SearchBook'

import Book from './Book'

interface BookListProps {}

const rowHeight = 375

const BookList: FC<BookListProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser } = useTypedSelector((store) => store.auth)
  const { books: allBooks, searchedBooks } = useTypedSelector(
    (state) => state.book
  )
  const { getBooks, getSearchedBooks } = useActions()
  const [isAdmin, setIsAdmin] = useState(false)

  const [books, setBooks] = useState(allBooks)
  const [isSearched, setIsSearched] = useState<boolean>(false)

  const searchTaskByTitle = (title: string) => {
    if (title) {
      setIsSearched(true)
      getSearchedBooks(title)
      return
    }
    setIsSearched(false)
  }

  useEffect(() => {
    if (isSearched) setBooks(searchedBooks)
    else setBooks(allBooks)
  }, [searchedBooks, isSearched, allBooks])

  useEffect(() => {
    getBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.role === Roles.Admin ||
        currentUser.role === Roles.SuperAdmin)
    )
      setIsAdmin(true)
  }, [currentUser])

  return (
    <>
      <CreateBookModal isOpen={isOpen} onClose={onClose} />

      <Box>
        {isAdmin && (
          <Flex justifyContent='flex-end' mb={2}>
            <Button onClick={onOpen}>Добавить книгу</Button>
          </Flex>
        )}

        <SearchBook
          placeholder='Введите название книги'
          onSearch={searchTaskByTitle}
        />

        <Grid
          minH={rowHeight * 3}
          p={8}
          bg='secondary.main'
          boxShadow='lg'
          rounded='lg'
          alignContent='flex-start'
          gap='15px'
          rowGap='20px'
          templateColumns={`repeat(auto-fit, minmax(210px, ${
            books.length >= 6 ? '1fr' : '210px'
          }))`}
        >
          {books.length ? (
            books.map((book) => (
              <Link href={`/books/${book.id}`} key={book.id}>
                <GridItem _hover={{ cursor: 'pointer' }}>
                  <Book book={book} />
                </GridItem>
              </Link>
            ))
          ) : isSearched ? (
            <GridItem>
              К сожалению такой книги у нас нет, обязательно обратитесь к
              администратору!
            </GridItem>
          ) : (
            <GridItem w='100%'>
              <Box>Сори книг нет</Box>
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  )
}

export default BookList
