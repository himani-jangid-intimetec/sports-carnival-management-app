import { MatchStatus } from './Event';

export { MatchStatus };

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
