export interface PlayerStats {
    [playerName: string]: {
        wins: number;
        losses: number;
        goalsFor: number;
        goalsAgainst: number;
        matches: number;
        tournaments: number;
        tournamentsWon: number;
        finals: number;
    };
}