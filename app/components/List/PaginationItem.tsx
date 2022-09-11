import { Button, ThemeTypings } from '@chakra-ui/react'
import { FC } from 'react'

type PaginationItemProps = {
  isCurrent?: boolean
  page: number
  onPageChange: (page: number) => void
  colorScheme?: ThemeTypings['colorSchemes']
}

const PaginationItem: FC<PaginationItemProps> = ({
  isCurrent = false,
  page,
  onPageChange,
  colorScheme
}) => {
  if (isCurrent) {
    return (
      <Button
        size='sm'
        fontSize='xs'
        width='4'
        disabled
        _disabled={{
          bg: `primary.main`,
          cursor: 'pointer'
        }}
        _hover={{
          bg: 'primary.hover'
        }}
      >
        {page}
      </Button>
    )
  }

  return (
    <Button
      size='sm'
      fontSize='xs'
      width='4'
      border='1px solid black'
      bg='transparent'
      color='text.black'
      _hover={{
        bg: 'primary.main',
        color: 'text.main'
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  )
}

export default PaginationItem
