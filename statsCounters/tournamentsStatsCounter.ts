import { Match } from "../models/matches";
import { TournamentStats } from "../types/tournamentStats.type";

type TournamentStatsCounterProps = {
  matches: Match[];
};
export function tournamentsStatsCounter({
  matches,
}: TournamentStatsCounterProps): TournamentStats {
  const tournamentStats: TournamentStats = {};
  const tournamentPlayers: { [tournamentName: string]: Set<string> } = {};
  matches.forEach((match) => {
    if (!tournamentStats[match.tournament]) {
      tournamentStats[match.tournament] = {
        matches: 0,
        players: 0,
        goals: 0,
        winner: "",
        date: match.tournamentDay.toISOString(),
      };
      tournamentPlayers[match.tournament] = new Set();
    }
    tournamentStats[match.tournament].matches++;
    tournamentPlayers[match.tournament].add(match.player1).add(match.player3);
    if (match.player2 && match.player4) {
      tournamentPlayers[match.tournament].add(match.player2).add(match.player4);
    }
    tournamentStats[match.tournament].goals += match.score1 + match.score2;
    if (match.final) {
      tournamentStats[match.tournament].winner =
        match.score1 > match.score2 ? match.player1 : match.player3;
    }
  });

  for (const tournamentName in tournamentPlayers) {
    tournamentStats[tournamentName].players =
      tournamentPlayers[tournamentName].size;
  }

  return tournamentStats;
}
