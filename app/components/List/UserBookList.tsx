import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { FiTrash2, FiUser } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { getUserRecords } from '@/store/record/actions'

import Table from './Table'

interface UserBookListProps {}
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}

const formatDate = (date: string | null) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('ru')
}

const UserBookList: FC<UserBookListProps> = () => {
  const [page, setPage] = useState(1)
  const { userRecords } = useTypedSelector((state) => state.record)
  // const { getUserRecords } = useActions()
  const dispatch = useDispatch()

  useEffect(() => {
    const test = async () => {
      await dispatch(getUserRecords())
    }

    // setTimeout(() => test(), 1000)
    test()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableData = userRecords.map((record) => ({
    title: (
      <Flex align='center' key={record?.id}>
        <Text>{record?.book.title}</Text>
      </Flex>
    ),
    isReturned: (
      <Flex>
        {record?.isReturned && !record.isOverdue ? (
          <Badge colorScheme='green'>Возвращено</Badge>
        ) : record?.isReturned && record.isOverdue ? (
          <Badge colorScheme='red'>Возвращено</Badge>
        ) : !record?.isIssued ? (
          <Badge colorScheme='blue'>На рассмотрении</Badge>
        ) : new Date(record.returningDate).getTime() < Date.now() ? (
          <Badge colorScheme='red'>Просрочено</Badge>
        ) : (
          record.factReturningDate === null && (
            <Badge colorScheme='blackAlpha'>Читает</Badge>
          )
        )}
      </Flex>
    ),
    recievingDate: formatDate(record.recievingDate),

    returningDate: formatDate(record.returningDate),
    factReturningData: formatDate(record.factReturningDate)
    // action: (
    //   <>
    //     <Button
    //       colorScheme='gray'
    //       onClick={() => console.log('remove user!')}
    //       size='sm'
    //     >
    //       <Icon as={FiTrash2} fontSize='20' />
    //     </Button>
    //   </>
    // )
  }))

  const tableColumns = [
    {
      Header: 'Название книги',
      accessor: 'title' as const
    },
    {
      Header: 'Состояние',
      accessor: 'isReturned' as const
    },
    {
      Header: 'Дата взятия',
      accessor: 'recievingDate' as const
    },
    {
      Header: 'Дата возврата',
      accessor: 'returningDate' as const
    },
    {
      Header: 'Фактическая дата возврата',
      accessor: 'factReturningData' as const
    }
    // {
    //   Header: '',
    //   accessor: 'action' as const
    // }
  ]

  return (
    <Box
      w={'full'}
      bg='white'
      color='text.black'
      boxShadow={'2xl'}
      rounded={'lg'}
      p='12'
      textAlign={'center'}
    >
      <Heading size='sm' as='h3'>
        История пользователя
      </Heading>

      <Box mt='6'>
        <Table
          h='497px'
          itemsPerPage={7}
          colorScheme='blue'
          // Fallback component when list is empty
          emptyData={{
            text: 'Пользователь еще не брал книг'
          }}
          totalRegisters={userRecords.length}
          page={page}
          // Listen change page event and control the current page using state
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData}
        />
      </Box>
    </Box>
  )
}

export default UserBookList
