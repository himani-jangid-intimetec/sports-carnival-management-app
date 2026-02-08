import { Match } from '../models/Match';
import { MatchStatus, UpcomingMatchStatus } from '../models/Event';

export const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    gameName: 'Football',
    firstTeam: 'Thunder Hawks',
    secondTeam: 'Storm Riders',
    status: MatchStatus.LIVE,
    firstTeamPoints: 2,
    secondTeamPoints: 1,
    venue: 'Court A',
  },
  {
    id: '2',
    gameName: 'Badminton',
    firstTeam: 'Smashers',
    secondTeam: 'Drop Shots',
    status: MatchStatus.UPCOMING,
    firstTeamPoints: 0,
    secondTeamPoints: 0,
    venue: 'Court B',
  },
  {
    id: '3',
    gameName: 'Table Tennis',
    firstTeam: 'Spin Masters',
    secondTeam: 'Top Spinners',
    status: MatchStatus.COMPLETED,
    firstTeamPoints: 3,
    secondTeamPoints: 2,
    venue: 'Hall 2',
  },
];

export type UpcomingMatch = {
  sport: string;
  title: string;
  date: string;
  location: string;
  currentTeams: number;
  maxTeams: number;
  status: UpcomingMatchStatus;
};

export const UPCOMING_MATCHES: UpcomingMatch[] = [
  {
    sport: 'Football',
    title: 'Inter-College Football Championship',
    date: 'Jan 20, 2026',
    location: 'Central Stadium',
    currentTeams: 12,
    maxTeams: 16,
    status: UpcomingMatchStatus.REGISTRATION_OPEN,
  },
  {
    sport: 'Carrom',
    title: 'Inter-College Carrom Championship',
    date: 'Jan 30, 2026',
    location: 'Central Stadium',
    currentTeams: 5,
    maxTeams: 10,
    status: UpcomingMatchStatus.UPCOMING,
  },
];
