import React, { useMemo } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, TableState } from "react-table";

import { PlayerStats } from "../../types/playerStats.type";
import { PlayerStatsColumns } from "../../lib/constants";

type Props = {
  playerStats: PlayerStats;
};

export default function PlayersStatsTable({ playerStats }: Props) {
  const data = useMemo<
    Array<PlayerStats[keyof PlayerStats] & { name: string }>
  >(
    () =>
      Object.entries(playerStats).map(([name, stats]) => ({
        name,
        ...stats,
      })),
    [playerStats]
  );
  const initialState = useMemo<
    Partial<TableState<PlayerStats[keyof PlayerStats] & { name: string }>>
  >(
    () => ({
      hiddenColumns: [],
      sortBy: [
        {
          id: "tournaments",
          desc: true,
        },
      ],
    }),
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: PlayerStatsColumns,
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
            <Tr key={headerGroup.id}>
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
              <Tr
                {...row.getRowProps()}
                key={row.id}
                // bg={index % 2 === 0 ? "gray.50" : "gray.200"}
              >
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
