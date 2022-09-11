import { Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'

import { IRecord } from '@/types/models/IRecord'

import { useActions } from '@/hooks/useActoins'

import Column from './Column'
import Row from './Row'

interface RecordProps {
  record: IRecord
}

const Record: FC<RecordProps> = ({ record }) => {
  const { approveRecord, rejectRecord } = useActions()

  const handleApproveRecord = () => {
    approveRecord(record.id)
  }

  const handleRejectRecord = () => {
    rejectRecord(record.id)
  }

  return (
    <>
      <Row
        actions={
          <>
            <Button onClick={handleApproveRecord} mr='10px'>
              Одобрить
            </Button>

            <Button bg='red.500' onClick={handleRejectRecord}>
              Отменить
            </Button>
          </>
        }
      >
        <Column>{record.book.title}</Column>
        <Column>
          {record.user.lastName} {record.user.firstName}
        </Column>

        <Column>
          <Flex justifyContent='space-between'></Flex>
        </Column>
      </Row>
    </>
  )
}

export default Record
