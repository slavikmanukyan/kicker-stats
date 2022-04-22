import React from "react";
import { Column } from "react-table";
import { PlayerStats } from "../types/playerStats.type";

export type PlayerStateKey = keyof PlayerStats[keyof PlayerStats];

export const PlayerStateKeyMapper: {
  [K in PlayerStateKey]: string;
} = {
  tournaments: "Tournaments",
  matches: "Matches",
  wins: "Wins",
  losses: "Losses",
  goalsFor: "Goals For",
  goalsAgainst: "Goals Against",
  finals: "Finals",
  tournamentsWon: "Tournaments Won",
};

export const PlayerStatsColumns: Column<
  PlayerStats[keyof PlayerStats] & { name: string }
>[] = [
  {
    Header: "Player",
    accessor: "name",
    isNumeric: false,
  },
  {
    Header: "Tournaments",
    accessor: "tournaments",
    isNumeric: true,
    sortDescFirst: true,
  },
  {
    Header: "Matches",
    accessor: "matches",
    isNumeric: true,
    sortDescFirst: true,
  },
  {
    Header: "Wins",
    accessor: "wins",
    isNumeric: true,
    sortDescFirst: true,
  },
  {
    Header: "Losses",
    accessor: "losses",
    isNumeric: true,
  },
  {
    Header: "WP",
    accessor: (row: PlayerStats[keyof PlayerStats]) =>
      ((row.wins / row.matches) * 100).toFixed(2),
    isNumeric: true,
    sortDescFirst: true,
  },
  {
    Header: "Goals For",
    accessor: "goalsFor",
    isNumeric: true,
    sortDescFirst: true,
  },
  {
    Header: "Goals Against",
    accessor: "goalsAgainst",
    isNumeric: true,
  },
  {
    Header: "Finals",
    accessor: "finals",
    isNumeric: true,
    sortDescFirst: true,
  },
  {
    Header: "Tournaments Won",
    accessor: "tournamentsWon",
    isNumeric: true,
    sortDescFirst: true,
  },
];
