import { CloseIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuIcon,
  MenuItem,
  MenuList,
  Skeleton,
  Text
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { signOut } from '@/store/auth/actionCreators'

const MenuItems = (props) => {
  const { children, isLast, to = '/', ...rest } = props
  return (
    <Text
      ml={{ base: isLast ? 2 : 0 }}
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 2 : 8 }}
      display='block'
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  )
}

interface IHeaderProps {}

const Header: FC<IHeaderProps> = ({ isServerSideAuth }) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)
  const { isAuth, isServerAuth, currentUser, isLoading } = useTypedSelector(
    (store) => store.auth
  )
  // const { signOut } = useActions()
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    await dispatch(signOut())
    if (router.pathname !== '/sign-in') router.push({ pathname: '/sign-in' })
  }

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      py={3}
      px={10}
      color='text.black'
      bg='secondary.main'
    >
      <Link href='/'>
        <Flex
          align='center'
          _hover={{
            cursor: 'pointer'
          }}
        >
          <Image
            src='/logo.svg'
            style={{ userSelect: 'none' }}
            height='50px'
            width='100px'
            alt='Logo'
          />
        </Flex>
      </Link>

      <Box
        display={{ base: 'block', md: 'none' }}
        color='primary.main'
        onClick={toggleMenu}
      >
        <CloseIcon />
        {/* {show ? <CloseIcon /> : <MenuIcon />} */}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to='/library' color='text.black'>
            Библиотека
          </MenuItems>

          {!isServerSideAuth ? (
            <>
              <MenuItems to='/sign-in' isLast>
                <Button variant='link' color='text.black'>
                  Войти
                </Button>
              </MenuItems>

              <Box
                color='primary.main'
                display={{ base: 'none', md: 'inline' }}
              >
                /
              </Box>

              <MenuItems to='/sign-up' isLast>
                <Button variant='link' color='text.black'>
                  Регистрация
                </Button>
              </MenuItems>
            </>
          ) : (
            <Skeleton isLoaded={isAuth}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant='text'
                  cursor={'pointer'}
                  minW={0}
                >
                  <Flex alignItems='center'>
                    <Avatar
                      size={'sm'}
                      src={
                        'https://sun4-15.userapi.com/s/v1/ig2/zznmMfQlw3INFacs3AKWBFCHk12P9FSFR_Yrg9GftsyhKPj7sH7Mjwvn-X3n24kuliQ4vH9dN9ZJ908X905ln-Ph.jpg?size=400x400&quality=95&crop=0,0,597,597&ava=1'
                      }
                    />
                    <Box display='inline' ml='10px' >
                      {currentUser?.firstName} {currentUser?.lastName}
                    </Box>
                  </Flex>
                </MenuButton>

                <MenuList>
                  <Link href='/profile'>
                    <MenuItem>Профиль</MenuItem>
                  </Link>

                  <MenuDivider />

                  <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
                </MenuList>
              </Menu>
            </Skeleton>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
