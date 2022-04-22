import React from "react";
import { chakra } from "@chakra-ui/react";
import { Column } from "react-table";
import { TournamentStatsData } from "../../types/tournamentStats.type";

export const TournamentStatsColumns: Column<
  TournamentStatsData & { name: string }
>[] = [
  {
    Header: "Tournament",
    accessor: "name",
    isNumeric: false,
  },
  {
    Header: "Date",
    accessor: (row: TournamentStatsData) => new Date(row.date),
    sortType: "datetime",
    id: "date",
    Cell: (props: { value: Date }) => (
      <chakra.span>{props.value.toLocaleDateString('en-GB')}</chakra.span>
    ),
    sortDescFirst: true,
  },
  {
    Header: "Players",
    accessor: "players",
    isNumeric: true,
  },
  {
    Header: "Matches",
    accessor: "matches",
    isNumeric: true,
  },
  {
    Header: "Goals",
    accessor: "goals",
    isNumeric: true,
  },
  {
    Header: "Winner",
    accessor: "winner",
    isNumeric: false,
  },
];
