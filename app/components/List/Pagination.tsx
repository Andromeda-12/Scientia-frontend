import { Stack, Text, ThemeTypings } from '@chakra-ui/react'
import { FC } from 'react'

import PaginationItem from './PaginationItem'

type PaginationProps = {
  onPageChange: (page: number) => void
  currentPage: number
  lastPage: number
  nextPages: number[]
  previousPages: number[]
  siblingsCount: number
  colorScheme?: ThemeTypings['colorSchemes']
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  lastPage,
  previousPages,
  nextPages,
  siblingsCount,
  onPageChange,
  colorScheme
}) => {
  return (
    <Stack direction='row' justify='flex-end' align='center' spacing='6'>
      <Stack direction='row' spacing='4'>
        {currentPage > 1 + siblingsCount ? (
          <>
            <PaginationItem
              colorScheme={colorScheme}
              onPageChange={onPageChange}
              page={1}
            />
            {currentPage > 2 + siblingsCount ? (
              <Text color='text.black' w='8' textAlign='center'>
                ...
              </Text>
            ) : null}
          </>
        ) : null}

        {previousPages.length > 0
          ? previousPages.map((page) => (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))
          : null}

        <PaginationItem
          colorScheme={colorScheme}
          onPageChange={onPageChange}
          page={currentPage}
          isCurrent
        />

        {nextPages.length > 0
          ? nextPages.map((page) => (
              <PaginationItem
                colorScheme={colorScheme}
                onPageChange={onPageChange}
                page={page}
                key={page}
              />
            ))
          : null}

        {currentPage + siblingsCount < lastPage ? (
          <>
            {currentPage + 1 + siblingsCount < lastPage ? (
              <Text color='gray.300' w='8' textAlign='center'>
                ...
              </Text>
            ) : null}
            <PaginationItem
              colorScheme={colorScheme}
              onPageChange={onPageChange}
              page={lastPage}
            />
          </>
        ) : null}
      </Stack>
    </Stack>
  )
}

export default Pagination
