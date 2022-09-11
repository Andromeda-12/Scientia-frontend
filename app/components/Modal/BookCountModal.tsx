import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text
} from '@chakra-ui/react'
import { FC, useState } from 'react'

import { IBook } from '@/types/models/IBook'

import { useActions } from '@/hooks/useActoins'

interface CreateBookModalProps {
  onClose: () => void
  isOpen: boolean
  book: IBook
}

const initialValues = {
  title: '',
  description: '',
  author: '',
  count: 0
}

const CreateBookModal: FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  book
}) => {
  const [count, setCount] = useState<number>(1)
  const { takeBook } = useActions()

  const handleChangeNumberInput = (value: string) => setCount(+value)

  const handleSubmit = () => {
    takeBook(book.id)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      size='2xl'
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Сколько возьмете книг?</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mb={3}>Количество книг</Text>

          <NumberInput
            min={1}
            max={book.inStock}
            value={count}
            onChange={handleChangeNumberInput}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <ModalFooter>
            <Button onClick={handleSubmit} mr={3}>
              Взять книуг
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateBookModal
