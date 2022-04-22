export interface TournamentStatsData {
  matches: number;
  players: number;
  goals: number;
  winner: string;
  date: string;
}

export interface TournamentStats {
  [tournamentName: string]: TournamentStatsData;
}

export type TournamentStatsKey = keyof TournamentStats;
