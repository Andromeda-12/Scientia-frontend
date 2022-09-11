import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

import { IReview } from '@/types/models/IReview'
import { Roles } from '@/types/models/IUser'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import EditReviewModal from '../Modal/EditReviewModal'

import Rating from './Rating'

interface ReviewProps {
  review: IReview
}

const Review: FC<ReviewProps> = ({ review }) => {
  const [isCanEdit, setIsCanEdit] = useState(false)
  const { currentUser } = useTypedSelector((store) => store.auth)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (
      currentUser &&
      (review.user.id === currentUser?.id || currentUser?.role !== Roles.Reader)
    )
      setIsCanEdit(true)
  }, [currentUser])

  return (
    <>
      <EditReviewModal isOpen={isOpen} onClose={onClose} review={review} />

      <Box p={8} bg='secondary.main' boxShadow='lg' mb='25px'>
        <Flex mb='10px' justifyContent='space-between'>
          <Flex alignItems='center'>
            {review?.user?.avatarUrl && (
              <Avatar
                size={'sm'}
                mr='15px'
                src={`${process.env.API_URL}/images/${review?.user?.avatarUrl}`}
              />
            )}

            <Text mr='5px'>
              {review.user.firstName} {review.user.lastName}
            </Text>

            {isCanEdit && (
              <Box>
                <Button onClick={onOpen}>Редактировать</Button>
              </Box>
            )}
          </Flex>

          <Rating rating={review.rating} />
        </Flex>

        <Flex>
          <Text>{review.text}</Text>
        </Flex>
      </Box>
    </>
  )
}

export default Review
