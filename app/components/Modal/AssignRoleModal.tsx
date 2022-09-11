import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { Field, FieldProps, Form, Formik } from 'formik'
import { FC, useState } from 'react'
import ReactStars from 'react-rating-stars-component'

import { IReviewRequest } from '@/types/models/IReview'
import { IUser, Roles } from '@/types/models/IUser'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import FormField from '../Forms/FormField'
import Row from '../admin/Row'

import { reviewShema } from '@/common/validationSchema'

interface AssignRoleModalProps {
  isOpen: boolean
  onClose: () => void
  user: IUser
}

const roles = [Roles.Reader, Roles.Admin, Roles.SuperAdmin]

const RolesList = ({ onClose, user }) => {
  const { assignRole } = useActions()

  const assignRoleToUser = (role: string) => {
    assignRole({ id: user.id, role: role as Roles })
    onClose()
  }

  return (
    <Box
      minH='500px'
      width='80%'
      bg='secondary.main'
      alignContent='flex-start'
      gap='15px'
      boxShadow='lg'
      rounded='lg'
      _hover={{
        cursor: 'pointer'
      }}
    >
      {roles.map((role) => (
        <Box onClick={() => assignRoleToUser(role)} key={role}>
          <Row>{role}</Row>
        </Box>
      ))}
    </Box>
  )
}

const AssignRoleModal: FC<AssignRoleModalProps> = ({
  isOpen,
  onClose,
  user
}) => {
  const { assignRole } = useActions()
  const { currentBook } = useTypedSelector((store) => store.book)

  return (
    <Modal
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Назначить роль для {user.lastName} {user.firstName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <RolesList user={user} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default AssignRoleModal
