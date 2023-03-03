import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  chakra,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Link from "next/link";
import { Column, Row, TableState, useSortBy, useTable } from "react-table";

export type SortableTableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  initialState?: Partial<TableState<T>>;
  getRowLink?: (row: Row<T>) => string;
};

export default function SortableTable<T extends object>({
  columns,
  data,
  initialState,
    getRowLink,
}: SortableTableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data,
        initialState,
      },
      useSortBy
    );
  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <Thead bg="gray.200">
          {headerGroups.map((headerGroup) => (
            <Tr key={headerGroup.id || "headerGroup"}>
              <Th>#</Th>
              {headerGroup.headers.map((column) => {
                const { key, ...headerProps } = column.getHeaderProps(
                  column.getSortByToggleProps()
                );
                return (
                  <Th key={key} {...headerProps} isNumeric={column.isNumeric}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      <chakra.span pl="2">
                        {column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )}
                      </chakra.span>
                    ) : null}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            const { key, ...rowProps } = row.getRowProps();
            return (
              <Link key={key} href={getRowLink ? getRowLink(row) : '#' } passHref>
                <Tr
                  {...rowProps}
                  cursor="pointer"
                  bg={index % 2 ? "gray.50" : "gray.200"}
                  _hover={{ background: "gray.400" }}
                >
                  <Td>{index + 1}</Td>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      key={key + cell.column.id}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              </Link>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
