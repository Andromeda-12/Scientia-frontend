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
import _ from 'lodash'
import { FC, useEffect, useState } from 'react'

import { IUpdateUser } from '@/types/models/IUser'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import FormField from '../Forms/FormField'
import ImageUpload from '../Forms/ImageUpload'

import { updateUserShema } from '@/common/validationSchema'

interface EditProfileProps {
  isOpen: boolean
  onClose: () => void
}

const EditProfile: FC<EditProfileProps> = ({ isOpen, onClose }) => {
  const { currentUser } = useTypedSelector((store) => store.auth)
  const { updateUserInfo, changeAvatar } = useActions()
  const [image, setImage] = useState()

  const oldCurrentUser = _.cloneDeep(currentUser)

  const [initialUserInfo, setInitialUserInfo] = useState<IUpdateUser>(
    {} as IUpdateUser
  )

  useEffect(() => {
    if (currentUser) setInitialUserInfo(currentUser)
  }, [currentUser])

  const handleSubmit = (formData: IUpdateUser) => {
    console.log(!_.isEqual(currentUser, formData))

    if (!_.isEqual(currentUser, formData)) {
      const data = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      }
      updateUserInfo(data)
    }

    if (image) {
      const avatar = new FormData()
      avatar.append('avatar', image)
      changeAvatar(avatar)
    }

    onClose()
  }

  const handleImageInput = (image) => {
    setImage(image)
  }

  return (
    <Modal
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Редактирование профиля</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={initialUserInfo}
            validationSchema={updateUserShema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Field name='email'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name=''
                      field={field}
                      isInvalid={
                        (form.errors.email && form.touched.email) as boolean
                      }
                      errorMessage={form.errors.email as string}
                    />
                  )}
                </Field>

                <Field name='firstName'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name=''
                      field={field}
                      isInvalid={
                        (form.errors.firstName &&
                          form.touched.firstName) as boolean
                      }
                      errorMessage={form.errors.firstName as string}
                    />
                  )}
                </Field>

                <Field name='lastName'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name=''
                      field={field}
                      isInvalid={
                        (form.errors.lastName &&
                          form.touched.lastName) as boolean
                      }
                      errorMessage={form.errors.lastName as string}
                    />
                  )}
                </Field>

                <Field name='phone'>
                  {({ field, form }: FieldProps) => (
                    <FormField
                      name=''
                      field={field}
                      isInvalid={
                        (form.errors.phone && form.touched.phone) as boolean
                      }
                      errorMessage={form.errors.phone as string}
                    />
                  )}
                </Field>

                <Box mt={5}>
                  <ImageUpload onInput={handleImageInput} />
                </Box>

                <ModalFooter>
                  <Button type='submit' mr={3}>
                    Сохранить
                  </Button>
                  <Button onClick={onClose}>Отмена</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default EditProfile
