import { Badge, Box, Circle, Flex, Image } from '@chakra-ui/react'
import { FC } from 'react'
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
import { trim } from 'utils/trim'

import { IBook } from '@/types/models/IBook'

import Rating from './Rating'

interface BookProps {
  book: IBook
}

const Book: FC<BookProps> = ({ book }) => {
  return (
    <Flex alignItems='center' justifyContent='flex-start' h='375' w='210px'>
      <Box rounded='lg'>
        <Box position='relative'>
          <Image
            src={`${process.env.API_URL}/images/${book.coverUrl}`}
            h='300px'
            w='210px'
            alt={`Picture of ${book.title}`}
          />

          <Box display='flex' alignItems='baseline'>
            {book.isNew && (
              <Badge
                position='absolute'
                bottom={2}
                left={2}
                rounded='full'
                px='2'
                fontSize='0.8em'
                colorScheme='red'
              >
                New
              </Badge>
            )}
          </Box>
        </Box>

        <Box mt='2' pb='5' h='67x' ml='2px'>
          <Flex h='50%' justifyContent='flex-start' alignContent='center'>
            <Box fontSize='md' as='h3'>
              {trim(book.title, 25)}
            </Box>
          </Flex>

          <Flex
            mt='1'
            h='50%'
            justifyContent='space-between'
            alignContent='center'
          >
            <Rating rating={book.rating} numReviews={book.countReviews} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}
export default Book
