export type EventStatus =
  | 'OPEN'
  | 'UPCOMING'
  | 'LIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export type GenderType = 'Male' | 'Female';

export interface Registration {
  id: string;
  name: string;
  gender: GenderType;
}

export interface Team {
  id: string;
  name: string;
  players: Registration[];
  gender: GenderType;
}

export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';

export interface Fixture {
  id: string;
  teamA: string | null;
  teamB: string | null;
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
  date: string;
  time: string;
  venue: string;

  status: EventStatus;
  format: '1v1' | '2v2';

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
