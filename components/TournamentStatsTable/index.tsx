import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  chakra,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TableState, useSortBy, useTable } from "react-table";
import {
  TournamentStats,
  TournamentStatsData,
} from "../../types/tournamentStats.type";
import { TournamentStatsColumns } from "./columns";

type Props = {
  tournamentStats: TournamentStats;
};

export default function TournamentStatsTable({ tournamentStats }: Props) {
  const data = useMemo<Array<TournamentStatsData & { name: string }>>(
    () =>
      Object.entries(tournamentStats).map(([name, stats]) => ({
        name,
        ...stats,
      })),
    [tournamentStats]
  );
  const initialState = useMemo<
    Partial<TableState<TournamentStatsData & { name: string }>>
  >(
    () => ({
      hiddenColumns: [],
      sortBy: [
        {
          id: "date",
          desc: true,
        },
      ],
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: TournamentStatsColumns,
        data,
        initialState,
      },
      useSortBy
    );

  return (
    <TableContainer>
      <Table {...getTableProps()} variant="striped" colorScheme="gray">
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
            return (
              <Tr {...row.getRowProps()} key={row.id}>
                <Td>{index + 1}</Td>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    key={row.id + cell.column.id}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
