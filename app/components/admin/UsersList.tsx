import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'

import { IUser, Roles } from '@/types/models/IUser'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import AssignRoleModal from '../Modal/AssignRoleModal'

import Column from './Column'
import Row from './Row'

interface UsersListProps {}

interface UserProps {
  user: IUser
  onClick: () => void
}

const User: FC<UserProps> = ({ user, onClick }) => {
  const assignRole = () => {}
  return (
    <Box onClick={onClick}>
      <Row
        actions={
          <>
            <Button onClick={assignRole} mr='10px'>
              Назначить роль
            </Button>
          </>
        }
      >
        <Column>
          {user.lastName} {user.firstName}
        </Column>

        <Column>{user.role}</Column>
      </Row>
    </Box>
  )
}

const UsersList: FC<UsersListProps> = () => {
  const { users } = useTypedSelector((store) => store.users)
  const { getUsers } = useActions()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser)

  const openAssignRoleModal = (user: IUser) => {
    setSelectedUser(user)
    onOpen()
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AssignRoleModal user={selectedUser} isOpen={isOpen} onClose={onClose} />

      <Box
        minH='500px'
        width='80%'
        bg='secondary.main'
        alignContent='flex-start'
        gap='15px'
        boxShadow='lg'
        rounded='lg'
      >
        {users?.map((user) => (
          <Box key={user.id}>
            {user.role !== Roles.SuperAdmin && (
              <User user={user} onClick={() => openAssignRoleModal(user)} />
            )}
          </Box>
        ))}
      </Box>
    </>
  )
}

export default UsersList
