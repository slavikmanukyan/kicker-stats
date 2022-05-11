import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import Head from "next/head";
import individualStatsCounter from "../statsCounters/individualStatsCounter";
import { IndividualStats } from "../types/individualStats.type";
import { Player } from "../models/players";
import initDB from "../lib/db";
import { getPlayer, getPlayerMatches, getPlayers } from "../lib/getDbData";
import IndividualStatsGrid from "../components/IndividalStatsGrid";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";

export async function getStaticPaths() {
  await initDB();
  const players = await getPlayers();

  return {
    paths: players.map((player) => ({
      params: {
        playerName: player.name,
      },
    })),
    fallback: false,
  };
}

type Params = {
  params: {
    playerName: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  await initDB();
  const { _id, ...player } = (await getPlayer(params.playerName)).toObject();
  const matches = await getPlayerMatches(params.playerName);
  const players = await getPlayers();
  const stats = individualStatsCounter(player.name, matches, players);
  return {
    props: {
      player,
      stats,
    },
  };
};

export default function PlayerStats({
  player,
  stats,
}: {
  player: Player;
  stats: IndividualStats;
}) {
  return (
    <>
      <Head>
        <title>Kicker Stats - {player.name}</title>
        <meta name="description" content={`Stats of ${player.name}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Breadcrumb
          spacing="8px"
          pl={5}
          pt={10}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <Link href="/" passHref>
              <BreadcrumbLink>All Players</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/${player.name}`}>
              {player.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading textAlign="center" py={5} pt={5}>
          Kicker Stats - {player.name}
        </Heading>
        <IndividualStatsGrid playerStats={stats} playerName={player.name} />
        <Box p={5}>
          <Heading>Overall Stats of {player.name}</Heading>
          <List p={5} fontSize="1.5rem">
            <ListItem>
              <strong>Tournaments:</strong> {stats.tournaments}
            </ListItem>
            <ListItem>
              <strong>Finals Played:</strong> {stats.finals}
            </ListItem>
            <ListItem>
              <strong>Tournaments Won:</strong> {stats.tournamentsWon}
            </ListItem>
          </List>
        </Box>
      </main>
    </>
  );
}
