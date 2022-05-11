import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import GridItem from "./components/GridItem";
import WinLoseChart from "./components/WinLoseChart";
import { IndividualStats } from "../../types/individualStats.type";

type Props = {
  playerStats: IndividualStats;
  playerName: string;
};

export default function IndividualStatsGrid({
  playerStats,
  playerName,
}: Props) {
  return (
    <SimpleGrid
      columns={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
      p="10px"
      spacing={20}
    >
      <GridItem text={`${playerName} played ${playerStats.matches} matches.`}>
        <WinLoseChart wins={playerStats.wins} losses={playerStats.losses} />
      </GridItem>
      <GridItem
        text={`${playerName}'s best partner is ${playerStats.bestPartner.name} with ${playerStats.bestPartner.matches} matches.`}
      >
        <WinLoseChart
          wins={playerStats.bestPartner.wins}
          losses={playerStats.bestPartner.losses}
        />
      </GridItem>
      <GridItem
        text={`${playerName}'s worst partner is ${playerStats.worstPartner.name} with ${playerStats.worstPartner.matches} matches.`}
      >
        <WinLoseChart
          wins={playerStats.worstPartner.wins}
          losses={playerStats.worstPartner.losses}
        />
      </GridItem>
      <GridItem
        text={`${playerName}'s best opponent is ${playerStats.bestOpponent.name} with ${playerStats.bestOpponent.matches} matches.`}
      >
        <WinLoseChart
          wins={playerStats.bestOpponent.wins}
          losses={playerStats.bestOpponent.losses}
        />
      </GridItem>
      <GridItem
        text={`${playerName}'s worst opponent is ${playerStats.worstOpponent.name} with ${playerStats.worstOpponent.matches} matches.`}
      >
        <WinLoseChart
          wins={playerStats.worstOpponent.wins}
          losses={playerStats.worstOpponent.losses}
        />
      </GridItem>
      <GridItem
        text={`${playerName} played ${
          playerStats.soloLosses + playerStats.soloWins
        } solo matches.`}
      >
        <WinLoseChart
          wins={playerStats.soloWins}
          losses={playerStats.soloLosses}
        />
      </GridItem>
    </SimpleGrid>
  );
}
