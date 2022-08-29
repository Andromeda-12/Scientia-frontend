import { Box, Center, Skeleton, Stack, Text } from '@chakra-ui/react'
import { withCheckServerSideAuth } from 'utils/requiredAuth'

import { Page } from '@/types/app'

import { useTypedSelector } from '@/hooks/useTypedSelector'

const Profile: Page = () => {
  const { currentUser, isLoading } = useTypedSelector((store) => store.auth)

  return (
    <>
      <Center py={6}>
        <Box
          w={'full'}
          bg='white'
          color='text.black'
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}
        >
          <Box p={6}>
            <Skeleton isLoaded={currentUser !== undefined}>
              <Box>
                <Text color={'gray.500'} display='inline'>
                  {currentUser?.firstName} {currentUser?.lastName}
                </Text>
              </Box>

              <Box>
                <Text color={'gray.500'} display='inline'>
                  {currentUser?.email}
                </Text>
              </Box>
            </Skeleton>
          </Box>
        </Box>
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
