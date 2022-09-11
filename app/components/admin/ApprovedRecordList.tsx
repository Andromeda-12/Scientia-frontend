import { Box, Button, Divider, Flex } from '@chakra-ui/react'
import { FC, ReactNode, useEffect } from 'react'

import { IRecord } from '@/types/models/IRecord'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import Column from './Column'
import Row from './Row'

interface ApprovedRecordListProps {}

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

const ApprovedRecordList: FC<ApprovedRecordListProps> = () => {
  const { approvedRecords } = useTypedSelector((store) => store.record)
  const { getApprovedRecords } = useActions()

  useEffect(() => {
    getApprovedRecords()
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
      {approvedRecords?.map((record) => (
        <>
          <Record record={record} key={record.id} />
          <Divider borderWidth='2px' bg='black' />
        </>
      ))}
    </Box>
  )
}

export default ApprovedRecordList
