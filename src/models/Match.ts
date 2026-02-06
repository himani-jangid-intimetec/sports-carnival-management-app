export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED';

export type Match = {
  id: string;
  gameName: string;
  firstTeam: string;
  secondTeam: string;
  status: MatchStatus;
  firstTeamPoints: number;
  secondTeamPoints: number;
  venue: string;
};
