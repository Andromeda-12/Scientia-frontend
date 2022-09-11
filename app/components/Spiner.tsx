import { Spinner } from '@chakra-ui/react'
import { FC } from 'react'

import CenterLayout from './Layouts/CenterLayout'

const Spiner: FC = () => (
  <CenterLayout>
    <Spinner size='xl' />
  </CenterLayout>
)

export default Spiner
