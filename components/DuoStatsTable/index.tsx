import {
  Box,
  Button,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDeferredValue, useMemo, useState } from "react";
import { TableState } from "react-table";
import { DuoStatsColumns } from "../../lib/constants";
import { DuoStats } from "../../statsCounters/duoStatsCounter";
import SortableTable from "../SortableTable";

export default function DuoStatsTable({ duoStats }: { duoStats: DuoStats }) {
  const [duoFilter, setDuoFilter] = useState<string>("");
  const [matchesFilter, setMatchesFilter] = useState<number>(0);
  const deferredFilter = useDeferredValue(duoFilter);
  const data = useMemo<Array<DuoStats[keyof DuoStats]>>(
    () =>
      Object.values(duoStats).filter((duo) => {
        return (
          duo.name
            .toLowerCase()
            .includes(deferredFilter.toLowerCase().trim()) &&
          duo.matches > matchesFilter
        );
      }),
    [duoStats, deferredFilter, matchesFilter]
  );
  const initialState = useMemo<Partial<TableState<DuoStats[keyof DuoStats]>>>(
    () => ({
      hiddenColumns: [],
      sortBy: [
        {
          id: "matches",
          desc: true,
        },
      ],
    }),
    []
  );

  const table = useMemo(
    () => (
      <SortableTable
        columns={DuoStatsColumns}
        data={data}
        initialState={initialState}
      />
    ),
    [data, initialState]
  );
  return (
    <>
      <Box mb={4} display="flex" flexDirection="row">
        <Input
          placeholder="Filter duo"
          value={duoFilter}
          onChange={(e) => setDuoFilter(e.target.value)}
        />
        <Button
          colorScheme="teal"
          ml={2}
          variant={matchesFilter === 0 ? "outline" : "solid"}
          onClick={() => {
            setMatchesFilter((prev) => (prev === 0 ? 2 : 0));
          }}
        >
          More than 2 matches
        </Button>
      </Box>
      {table}
    </>
  );
}
