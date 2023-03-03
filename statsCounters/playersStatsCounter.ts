import { Match } from "../models/matches";
import { Player } from "../models/players";
import { PlayerStats } from "../types/playerStats.type";

type TournamentStatsCounterProps = {
  matches: Match[];
  players: Player[];
};

export function playersStatsCounter({
  matches,
  players,
}: TournamentStatsCounterProps): PlayerStats {
  const playerTournaments: { [playerName: string]: Set<string> } = {};

  const playerStats: PlayerStats = {};
  players.forEach((player) => {
    playerTournaments[player.name] = new Set();
    playerStats[player.name] = {
      wins: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      matches: 0,
      tournaments: 0,
      tournamentsWon: 0,
      finals: 0,
    };
  });
  matches.forEach((match) => {
    playerTournaments[match.player1].add(match.tournament);
    playerTournaments[match.player3].add(match.tournament);
    if (match.player2 && match.player4) {
      playerTournaments[match.player2].add(match.tournament);
      playerTournaments[match.player4].add(match.tournament);
    }
    playerStats[match.player1].goalsFor += match.score1;
    playerStats[match.player1].goalsAgainst += match.score2;
    playerStats[match.player3].goalsFor += match.score2;
    playerStats[match.player3].goalsAgainst += match.score1;
    if (match.player2 && match.player4) {
      playerStats[match.player2].goalsFor += match.score1;
      playerStats[match.player2].goalsAgainst += match.score2;
      playerStats[match.player4].goalsFor += match.score2;
      playerStats[match.player4].goalsAgainst += match.score1;
    }
    if (match.score1 > match.score2) {
      playerStats[match.player1].wins++;

      playerStats[match.player1].matches++;
      if (match.final) {
        playerStats[match.player1].tournamentsWon++;
        playerStats[match.player1].finals++;
        playerStats[match.player3].finals++;
      }
      playerStats[match.player3].losses++;
      playerStats[match.player3].matches++;
      if (match.player2 && match.player4) {
        playerStats[match.player2].wins++;
        playerStats[match.player2].matches++;
        playerStats[match.player4].losses++;
        playerStats[match.player4].matches++;
      }
    } else {
      playerStats[match.player1].losses++;
      playerStats[match.player1].matches++;
      if (match.final) {
        playerStats[match.player3].tournamentsWon++;
        playerStats[match.player1].finals++;
        playerStats[match.player3].finals++;
      }
      playerStats[match.player3].wins++;
      playerStats[match.player3].matches++;
      if (match.player2 && match.player4) {
        playerStats[match.player2].losses++;
        playerStats[match.player2].matches++;
        playerStats[match.player4].wins++;
        playerStats[match.player4].matches++;
      }
    }
  });
  players.forEach((player) => {
    playerStats[player.name].tournaments = playerTournaments[player.name].size;
  });
  return playerStats;
}
