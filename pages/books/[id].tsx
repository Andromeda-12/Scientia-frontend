import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'
import { Roles } from '@/types/models/IUser'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import EditBookModal from '@/components/Modal/EditBookModal'
import WriteReviewModal from '@/components/Modal/WriteReviewModal'
import Rating from '@/components/books/Rating'
import Review from '@/components/books/Review'

import { getBook } from '@/store/books/actions'

const BookPage: Page = () => {
  const {
    isOpen: isOpenEditBookModal,
    onOpen: onOpenEditBookModal,
    onClose: onCloseEditBookModal
  } = useDisclosure()
  const { reviews } = useTypedSelector((store) => store.review)
  const { currentBook } = useTypedSelector((store) => store.book)
  const { currentUser } = useTypedSelector((store) => store.auth)
  const { getReviews } = useActions()
  const {
    isOpen: isOpenReviewModal,
    onOpen: onOpenReviewModal,
    onClose: onCloseReviewModal
  } = useDisclosure()

  const { takeBook } = useActions()

  const takeCurrentBook = () => {
    takeBook({ bookId: currentBook.id })
  }

  useEffect(() => {
    getReviews(currentBook.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('render book')

  return (
    <>
      <EditBookModal
        isOpen={isOpenEditBookModal}
        onClose={onCloseEditBookModal}
      />

      <Box
        p={8}
        bg='secondary.main'
        boxShadow='lg'
        rounded='lg'
        position='relative'
      >
        <Flex direction='column'>
          <Center mb='40px'>
            <Box w='65%' display='flex' gap='20px'>
              <Flex flex='40%'>
                {currentBook.coverUrl && (
                  <Image
                    src={`${process.env.API_URL}/images/${currentBook.coverUrl}`}
                    alt={currentBook.title}
                    sizes='300px'
                  />
                )}
              </Flex>

              <Flex flex='60%' direction='column'>
                <Text fontSize='2xl' fontWeight='bold' mb='15px'>
                  {currentBook.title}
                </Text>

                <Text
                  fontSize='lg'
                  fontWeight='normal'
                  color='gray.400'
                  mb='15px'
                >
                  {currentBook.author || 'Автор не указан'}
                </Text>

                <Text
                  fontSize='lg'
                  fontWeight='normal'
                  color='gray.400'
                  mb='15px'
                >
                  В наличии: {currentBook.inStock}
                </Text>

                <Text
                  fontSize='lg'
                  fontWeight='normal'
                  color='gray.400'
                  mb='15px'
                  as='div'
                >
                  {currentBook.rating !== 0 ? (
                    <>
                      <Flex>
                        Рейтинг:{' '}
                        <Box ml={2}>
                          <Rating rating={currentBook.rating} />
                        </Box>
                      </Flex>
                    </>
                  ) : (
                    'Нет оценок'
                  )}
                </Text>

                <Button
                  mb='15px'
                  disabled={currentBook.inStock === 0}
                  onClick={takeCurrentBook}
                >
                  Взять книгу
                </Button>

                <Text fontSize='lg' fontWeight='normal'>
                  {currentBook.description}
                </Text>
              </Flex>
            </Box>
          </Center>

          {currentUser && currentUser.role !== Roles.Reader && (
            <Box position='absolute' right='6'>
              <Button onClick={onOpenEditBookModal}>Редактировать</Button>
            </Box>
          )}

          <Divider borderWidth='1px' />

          <Flex mt='40px' direction='column' alignItems='center'>
            <WriteReviewModal
              isOpen={isOpenReviewModal}
              onClose={onCloseReviewModal}
            />

            <Box w='80%'>
              {currentUser && (
                <Flex mb='40px' justifyContent='flex-end'>
                  <Button onClick={onOpenReviewModal}>Оставить отзыв</Button>
                </Flex>
              )}

              {reviews?.map((review) => (
                <Review review={review} key={review.id} />
              ))}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

// export async function getStaticPaths() {
//   const res = await fetch('http://localhost:5000/api/book')
//   const books = await res.json()

//   const paths = books.map((book) => ({
//     params: { id: book.id.toString() }
//   }))

//   return { paths, fallback: false }
// }

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     ({ params }) => {
//       store.dispatch(getBook(params.id))
//     }
// )

export const getServerSideProps = withCheckServerSideAuth(
  async (store, ctx) => {
    await store.dispatch(getBook(Number(ctx.query.id)))
    return { props: {} }
  }
)

// BookPage.getInitialProps = wrapper.getInitialPageProps(
//   (store) => async (ctx) => {
//     await store.dispatch(getBook(Number(ctx.query.id)))

//     return {}
//   }
// )

export default BookPage
