import { Match } from "../models/matches";
import { Player } from "../models/players";
import { IndividualStats, PartnerData } from "../types/individualStats.type";

export default function individualStatsCounter(
  player: string,
  matches: Match[],
  players: Player[]
): IndividualStats {
  const initialPartnerData: PartnerData = {
    name: "",
    matches: 0,
    wins: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
  };
  const individualStats: IndividualStats = {
    name: player,
    wins: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    matches: matches.length,
    tournaments: 0,
    tournamentsWon: 0,
    finals: 0,
    soloWins: 0,
    soloLosses: 0,
    bestPartner: initialPartnerData,
    worstPartner: initialPartnerData,
    bestOpponent: initialPartnerData,
    worstOpponent: initialPartnerData,
  };

  const playerTournaments = new Set();
  const playerPartners: { [playerName: string]: Match[] } = {};
  const playerOpponents: { [playerName: string]: Match[] } = {};
  players.forEach((p) => {
    if (p.name == player) {
      return;
    }
    playerPartners[p.name] = [];
    playerOpponents[p.name] = [];
  });

  matches.forEach((match) => {
    playerTournaments.add(match.tournament);
    if (match.player1 === player || match.player2 === player) {
      individualStats.goalsFor += match.score1;
      individualStats.goalsAgainst += match.score2;
      if (match.final) {
        individualStats.finals++;
        if (match.score1 > match.score2) {
          individualStats.tournamentsWon++;
        }
      }
      if (match.score1 > match.score2) {
        individualStats.wins++;
        if (!match.player2) {
          individualStats.soloWins++;
        }
      } else {
        individualStats.losses++;
        if (!match.player2) {
          individualStats.soloLosses++;
        }
      }
      playerOpponents[match.player3].push(match);
      if (match.player2 && match.player4) {
        playerOpponents[match.player4].push(match);
        playerPartners[
          player === match.player2 ? match.player1 : match.player2
        ].push(match);
      }
    } else if (match.player3 === player || match.player4 === player) {
      individualStats.goalsFor += match.score2;
      individualStats.goalsAgainst += match.score1;
      if (match.final) {
        individualStats.finals++;
        if (match.score1 < match.score2) {
          individualStats.tournamentsWon++;
        }
      }
      if (match.score1 < match.score2) {
        individualStats.wins++;
        if (!match.player4) {
          individualStats.soloWins++;
        }
      } else {
        if (!match.player4) {
          individualStats.soloLosses++;
        }
        individualStats.losses++;
      }
      playerOpponents[match.player1].push(match);
      if (match.player2 && match.player4) {
        playerOpponents[match.player2].push(match);
        playerPartners[
          player === match.player4 ? match.player3 : match.player4
        ].push(match);
      }
    }
  });

  const partnerStats = Object.keys(playerPartners).map((partner) => {
    const partnerMatches = playerPartners[partner];
    const partnerStats: PartnerData = {
      name: partner,
      matches: partnerMatches.length,
      wins: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
    partnerMatches.forEach((match) => {
      if (match.player1 === player || match.player2 === player) {
        partnerStats.goalsFor += match.score1;
        partnerStats.goalsAgainst += match.score2;
        if (match.score1 > match.score2) {
          partnerStats.wins++;
        } else {
          partnerStats.losses++;
        }
      } else if (match.player3 === player || match.player4 === player) {
        partnerStats.goalsFor += match.score2;
        partnerStats.goalsAgainst += match.score1;
        if (match.score1 < match.score2) {
          partnerStats.wins++;
        } else {
          partnerStats.losses++;
        }
      }
    });
    return partnerStats;
  });
  const opponentStats = Object.keys(playerOpponents).map((opponent) => {
    const opponentMatches = playerOpponents[opponent];
    const opponentStats: PartnerData = {
      name: opponent,
      matches: opponentMatches.length,
      wins: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
    opponentMatches.forEach((match) => {
      if (match.player1 === player || match.player2 === player) {
        opponentStats.goalsFor += match.score2;
        opponentStats.goalsAgainst += match.score1;
        if (match.score1 < match.score2) {
          opponentStats.losses++;
        } else {
          opponentStats.wins++;
        }
      } else if (match.player3 === player || match.player4 === player) {
        opponentStats.goalsFor += match.score1;
        opponentStats.goalsAgainst += match.score2;
        if (match.score1 > match.score2) {
          opponentStats.losses++;
        } else {
          opponentStats.wins++;
        }
      }
    });
    return opponentStats;
  });
  const bestPartner = partnerStats.sort((a, b) => {
    return a.wins - b.wins;
  })[partnerStats.length - 1];
  const worstPartner = partnerStats.sort((a, b) => {
    return b.losses - a.losses;
  })[0];
  const bestOpponent = opponentStats.sort((a, b) => {
    return a.wins - b.wins;
  })[opponentStats.length - 1];
  const worstOpponent = opponentStats.sort((a, b) => {
    return a.losses - b.losses;
  })[opponentStats.length - 1];

  individualStats.bestPartner = bestPartner;
  individualStats.worstPartner = worstPartner;
  individualStats.bestOpponent = bestOpponent;
  individualStats.worstOpponent = worstOpponent;
  individualStats.tournaments = playerTournaments.size;

  return individualStats;
}
