export type EventStatus =
  | 'OPEN'
  | 'UPCOMING'
  | 'LIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export type CategoryStatus = 'ACTIVE' | 'ABANDONED';

export type GenderType = 'Male' | 'Female' | 'Mixed';
export type FormatType = 'Singles' | 'Doubles';

export interface Registration {
  id: string;
  name: string;
  gender: GenderType;
  formats: FormatType[];
}

export interface Team {
  id: string;
  name: string;
  players: Registration[];
  gender: GenderType;
  format: FormatType;
}

export type MatchStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';

export interface Fixture {
  id: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  time: string;
  round: number;
  totalRounds: number;
  status: MatchStatus;
  winner?: string;
  gender: GenderType;
  format: FormatType;
  bracketPosition: number;
}

export interface Event {
  id: string;
  name: string;
  sport: string;
  date: string;
  time: string;
  venue: string;

  status: EventStatus;

  formats: FormatType[];

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

  createdBy?: string;

  abandonedCategories?: string[];
}
