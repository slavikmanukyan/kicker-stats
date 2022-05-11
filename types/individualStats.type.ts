import { PlayerStatsData } from "./playerStats.type";

export interface PartnerData {
  name: string;
  matches: number;
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface IndividualStats extends PlayerStatsData {
  name: string;
  soloWins: number;
  soloLosses: number;
  bestPartner: PartnerData;
  worstPartner: PartnerData;
  bestOpponent: PartnerData;
  worstOpponent: PartnerData;
}
