import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { BsStarFill } from 'react-icons/bs'

interface RatingProps {
  rating: number
  numReviews?: number
}

const Rating: FC<RatingProps> = ({ rating, numReviews }) => {
  return (
    <Box display='flex' alignItems='center'>
      {rating !== 0 && numReviews !== 0 ? (
        <>
          <Box display='flex' alignItems='center'>
            {rating}
            <BsStarFill style={{ marginLeft: '5' }} color={'gray.300'} />
          </Box>
        </>
      ) : (
        <Text fontSize='sm'>Нет отзывов</Text>
      )}

      {/* {numReviews > 1 && 's'} */}
    </Box>
  )
}
export default Rating
