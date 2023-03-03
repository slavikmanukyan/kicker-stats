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
import Link from "next/link";
import SortableTable from "../SortableTable";

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

  return (
    <SortableTable
      columns={PlayerStatsColumns}
      data={data}
      initialState={initialState}
      getRowLink={(row) => `/${row.cells[0].value}`}
    />
  );
}
