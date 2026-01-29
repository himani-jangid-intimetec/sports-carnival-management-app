import { GameFormat } from '../constants/games';

export type EventStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED' | 'OPEN';

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
}
