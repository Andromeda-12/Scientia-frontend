import { Box, Input } from '@chakra-ui/react'
import { FC } from 'react'

import { useActions } from '@/hooks/useActoins'
import useDebounce from '@/hooks/useDebounce'

interface SearchProps {
  placeholder: string
  onSearch: (title: string) => void
}

const SearchBook: FC<SearchProps> = ({ placeholder, onSearch }) => {
  const debouncedOnSearch = useDebounce(onSearch, 500)

  return (
    <Box bg='secondary.main' rounded='lg' boxShadow='lg' mb={4}>
      <Input
        p={3}
        mx='10px'
        variant='unstyled'
        w='full'
        placeholder={placeholder}
        onChange={(e) => debouncedOnSearch(e.target.value)}
      />
    </Box>
  )
}

export default SearchBook
