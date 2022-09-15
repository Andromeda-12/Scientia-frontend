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

import { useActions } from '@/hooks/useActoins'
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
  const { deleteReview } = useActions()

  useEffect(() => {
    if (
      currentUser &&
      (review.user.id === currentUser?.id || currentUser?.role !== Roles.Reader)
    )
      setIsCanEdit(true)
  }, [currentUser])

  const formatDate = (date: string | null) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('ru')
  }

  const deleteCurrentReview = () => {
    deleteReview(review.id)
  }

  return (
    <>
      <EditReviewModal isOpen={isOpen} onClose={onClose} review={review} />

      <Box p={8} bg='secondary.main' boxShadow='lg' mb='25px'>
        <Flex w='100%' justifyContent='flex-end' mb='15px'>
          {formatDate(review.datePublication)}
          <Box ml='10px'>
            <Rating rating={review.rating} />
          </Box>
        </Flex>

        <Flex mb='10px' justifyContent='space-between'>
          <Flex alignItems='center' justifyContent='space-between' w='100%'>
            <Flex>
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
            </Flex>

            <Flex>
              {isCanEdit && (
                <>
                  <Button onClick={onOpen}>Редактировать</Button>
                  <Button ml='5px' onClick={deleteCurrentReview}>
                    Удалить
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex>
          <Text>{review.text}</Text>
        </Flex>
      </Box>
    </>
  )
}

export default Review
