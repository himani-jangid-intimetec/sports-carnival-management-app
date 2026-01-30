import { GameFormat } from '../constants/games';

export type EventStatus =
  | 'OPEN'
  | 'UPCOMING'
  | 'LIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export type GenderType = 'Male' | 'Female';

export interface Team {
  id: string;
  name: string;
  players: string[];
  gender: GenderType;
}

export type Registration = {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
};

export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';

export interface Fixture {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  time: string;
  round: number;
  status: MatchStatus;
  winner?: string;
}

export interface Event {
  id: string;
  name: string;
  sport: string;
  format: GameFormat;
  date: string;
  time: string;
  venue: string;

  status: EventStatus;

  registeredTeams: number;
  totalTeams: number;

  registrationDeadline: string;
  registrations: Registration[];

  teamsCreated: boolean;
  fixturesCreated: boolean;

  teams: Team[];
  fixtures: Fixture[];

  description: string;
  rules: string[];
  prizes: string[];
}
