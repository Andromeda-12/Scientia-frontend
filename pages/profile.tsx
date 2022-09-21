import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'
import { Roles } from '@/types/models/IUser'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import UserBookList from '@/components/List/UserBookList'
import EditProfile from '@/components/Modal/EditProfile'

const Profile: Page = () => {
  const { currentUser, isLoading } = useTypedSelector((store) => store.auth)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <EditProfile isOpen={isOpen} onClose={onClose} />

      <Center py={6} flexDirection='column'>
        <Flex flexDirection='row'>
          <Box
            w='40%'
            minW='500px'
            bg='white'
            color='text.black'
            boxShadow={'2xl'}
            rounded={'lg'}
            p='20px'
            textAlign={'center'}
          >
            <Flex>
              {currentUser?.role !== Roles.Reader && (
                <Box mr={2}>
                  <Link href='/admin'>
                    <Button>Страница администратора</Button>
                  </Link>
                </Box>
              )}

              <Button onClick={onOpen}>Редактировать профиль</Button>
            </Flex>

            <Flex mt='50px' mb='50px' justifyContent='center'>
              <Box>
                <Image
                  h='300px'
                  w='250px'
                  src={`${process.env.API_URL}/images/${currentUser?.avatarUrl}`}
                  alt='Аватарка'
                />
              </Box>

              <Box p={6}>
                <Skeleton isLoaded={currentUser !== undefined}>
                  <Box>
                    <Text color={'gray.500'} display='inline'>
                      {currentUser?.firstName} {currentUser?.lastName}
                    </Text>
                  </Box>

                  <Box>
                    <Text color={'gray.500'} display='inline'>
                      Почта: {currentUser?.email}
                    </Text>
                  </Box>

                  <Box>
                    <Text color={'gray.500'} display='inline'>
                      +{currentUser?.phone}
                    </Text>
                  </Box>

                  <Box>
                    <Text color={'gray.500'} display='inline'>
                      Порядочность: {currentUser?.decency}
                    </Text>
                  </Box>

                  <Box>
                    <Text color={'gray.500'} display='inline'>
                      Прочитано книг: {currentUser?.readedBooks}
                    </Text>
                  </Box>

                  <Box>
                    <Text color={'gray.500'} display='inline'>
                      Просрочено книг: {currentUser?.overdueBooks}
                    </Text>
                  </Box>
                </Skeleton>
              </Box>
            </Flex>
          </Box>

          <Box ml='20px' w='60%'>
            <UserBookList />
          </Box>
        </Flex>
      </Center>
    </>
  )
}

export const getServerSideProps = withCheckServerSideAuth(async (context) => {
  return {
    props: {}
  }
})

export default Profile
