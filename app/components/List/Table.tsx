import {
  Box,
  Table as ChakraTable,
  Flex,
  Tbody,
  Td,
  Th,
  Thead,
  ThemeTypings,
  Tr
} from '@chakra-ui/react'
import { FC } from 'react'
import React from 'react'
import { Column, useTable } from 'react-table'

import { usePagination } from '@/hooks/usePagination'

import NoContent, { NoContentProps } from './NoContent'
import Pagination from './Pagination'

type DataType = {
  [key: string]: JSX.Element | string
}

type EmptyMessage = Partial<NoContentProps>

interface TableProps {
  columns: Column<DataType>[]
  data: DataType[]
  page: number
  totalRegisters: number
  onPageChange: (page: number) => void
  colorScheme?: ThemeTypings['colorSchemes']
  emptyData?: EmptyMessage
  itemsPerPage: number
}

const Table: FC<TableProps> = ({
  page,
  onPageChange,
  totalRegisters,
  data,
  columns,
  colorScheme = 'teal',
  emptyData,
  itemsPerPage,
  ...other
}) => {
  const pagination = usePagination({
    registersPerPage: itemsPerPage,
    totalRegisters,
    page,
    items: data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: pagination.pageItems })

  if (data.length === 0) {
    return (
      <NoContent
        {...emptyData}
        {...other}
        text={emptyData?.text ?? 'Nenhum dado para ser exibido.'}
      >
        {emptyData?.children ?? null}
      </NoContent>
    )
  }

  return (
    <Box py='6' px='2' w='full' minWidth='700px' overflow='auto'>
      <Box
        height='100%'
        {...other}
        borderRadius='8px 8px 0px 0px'
        border='2px solid black'
        borderBottom='0'
      >
        <ChakraTable {...getTableProps()} overflowX='auto'>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <React.Fragment key={column.id}>
                    <Th
                      borderColor='black'
                      {...column.getHeaderProps()}
                      textTransform='none'
                      fontSize='md'
                    >
                      {column.render('Header')}
                    </Th>
                  </React.Fragment>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()} >
            {rows.map((row) => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell, index) => (
                    <React.Fragment key={cell.column.id + index}>
                      <Td
                        borderColor='black'
                        borderBottom='1px'
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Td>
                    </React.Fragment>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </ChakraTable>
      </Box>

      <Flex
        p={2}
        alignItems='center'
        justifyContent='center'
        borderRadius='0px 0px 8px 8px'
        border='2px solid black'
      >
        <Pagination
          {...pagination}
          colorScheme={colorScheme}
          onPageChange={onPageChange}
        />
      </Flex>
    </Box>
  )
}

export default Table
