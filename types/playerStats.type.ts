export interface PlayerStatsData {
    wins: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    matches: number;
    tournaments: number;
    tournamentsWon: number;
    finals: number;
};

export interface PlayerStats {
    [playerName: string]: PlayerStatsData;
}

export type PlayerStatsKey = keyof PlayerStats;