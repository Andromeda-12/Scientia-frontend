import { Box, Center, Divider } from '@chakra-ui/react'
import { FC, useEffect } from 'react'

import { useActions } from '@/hooks/useActoins'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import Record from './Record'

interface RecordsListProps {}

const RecordsList: FC<RecordsListProps> = () => {
  const { pendingConfirmationRecords } = useTypedSelector(
    (store) => store.record
  )
  const { getPendingConfirmationRecords } = useActions()

  useEffect(() => {
    getPendingConfirmationRecords()
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
      {pendingConfirmationRecords.length ? (
        pendingConfirmationRecords?.map((record) => (
          <>
            <Record record={record} key={record.id} />
            <Divider borderWidth='2px' bg='black' />
          </>
        ))
      ) : (
        <Center>Заявок нет</Center>
      )}
    </Box>
  )
}
export default RecordsList
