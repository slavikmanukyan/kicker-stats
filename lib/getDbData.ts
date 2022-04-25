import Matches, { Match } from "../models/matches";
import Players, { Player } from "../models/players";

export default async function getDbData(): Promise<{
  matches: Match[];
  players: Player[];
}> {
  return Promise.all([Matches.find({}).exec(), Players.find({}).exec()]).then(
    ([matches, players]) => ({
      matches,
      players,
    })
  );
}
