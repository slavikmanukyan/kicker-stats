import { Match } from "../models/matches";

export interface DuoStats {
  [duoName: string]: {
    name: string;
    wins: number;
    losses: number;
    matches: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

export function duoStatsCounter(matches: Match[]) {
  const duoStats: DuoStats = {};
  matches.forEach((match) => {
    if (match.player2 && match.player4) {
      const duo1 = [match.player1, match.player2].sort().join(" & ");
      const duo2 = [match.player3, match.player4].sort().join(" & ");
      if (duoStats[duo1]) {
        duoStats[duo1].matches++;
        duoStats[duo1].goalsFor += match.score1;
        duoStats[duo1].goalsAgainst += match.score2;
        if (match.score1 > match.score2) {
          duoStats[duo1].wins++;
        } else {
          duoStats[duo1].losses++;
        }
      } else {
        duoStats[duo1] = {
          name: duo1,
          wins: match.score1 > match.score2 ? 1 : 0,
          losses: match.score1 < match.score2 ? 1 : 0,
          matches: 1,
          goalsFor: match.score1,
          goalsAgainst: match.score2,
        };
      }
      if (duoStats[duo2]) {
        duoStats[duo2].matches++;
        duoStats[duo2].goalsFor += match.score2;
        duoStats[duo2].goalsAgainst += match.score1;
        if (match.score1 < match.score2) {
          duoStats[duo2].wins++;
        } else {
          duoStats[duo2].losses++;
        }
      } else {
        duoStats[duo2] = {
          name: duo2,
          wins: match.score1 < match.score2 ? 1 : 0,
          losses: match.score1 > match.score2 ? 1 : 0,
          matches: 1,
          goalsFor: match.score2,
          goalsAgainst: match.score1,
        };
      }
    }
  });
  return duoStats;
}
