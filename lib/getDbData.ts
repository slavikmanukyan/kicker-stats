import Matches, { Match } from "../models/matches";
import Players, { Player } from "../models/players";

export default async function getDbData(): Promise<{
  matches: Match[];
  players: Player[];
}> {
  return Promise.all([getMatches(), getPlayers()]).then(
    ([matches, players]) => ({
      matches,
      players,
    })
  );
}

export async function getPlayers(): Promise<Player[]> {
  return Players.find({}).exec();
}

export async function getPlayer(name: string): Promise<Player> {
  return Players.findOne({ name }).exec();
}

export async function getMatches(): Promise<Match[]> {
  return Matches.find({}).exec();
}

export async function getPlayerMatches(name: string): Promise<Match[]> {
  return Matches.find({
    $or: [
      {
        player1: name,
      },
      {
        player2: name,
      },
      {
        player3: name,
      },
      {
        player4: name,
      },
    ],
  }).exec();
}
