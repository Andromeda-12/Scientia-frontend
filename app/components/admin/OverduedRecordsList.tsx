import { Box, Button, Divider } from '@chakra-ui/react'
import { FC, useEffect } from 'react'

import { IRecord } from '@/types/models/IRecord'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import Column from './Column'
import Row from './Row'

interface OverduedRecordsListProps {}

interface RecordProps {
  record: IRecord
}

const Record: FC<RecordProps> = ({ record }) => {
  const { returnBook } = useActions()
  const handleReturnBook = () => {
    returnBook(record.id)
  }
  
  return (
    <>
      <Row
        actions={
          <>
            <Button onClick={handleReturnBook} mr='10px'>
              Вернул книгу
            </Button>
          </>
        }
      >
        <Column>{record.book.title}</Column>
        <Column>
          {record.user.lastName} {record.user.firstName}
        </Column>
      </Row>
    </>
  )
}

const OverduedRecordsList: FC<OverduedRecordsListProps> = () => {
  const { overduedRecords } = useTypedSelector((store) => store.record)
  const { getOverduedRecords } = useActions()

  useEffect(() => {
    getOverduedRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      minH='500px'
      width='80%'
      bg='secondary.main'
      alignContent='flex-start'
      gap='15px'
      boxShadow='lg'
      rounded='lg'
    >
      {overduedRecords?.map((record) => (
        <>
          <Record record={record} key={record.id} />
          <Divider borderWidth='2px' bg='black' />
        </>
      ))}
    </Box>
  )
}

export default OverduedRecordsList
