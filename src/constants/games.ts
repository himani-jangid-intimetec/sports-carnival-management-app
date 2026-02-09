import { FormatType } from '../models/Event';

export type Game = {
  id: string;
  name: string;
  formats: FormatType[];
};

export const GAMES: Game[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    formats: [FormatType.Singles, FormatType.Doubles],
  },
  {
    id: 'table_tennis',
    name: 'Table Tennis',
    formats: [FormatType.Singles, FormatType.Doubles],
  },
  {
    id: 'carrom',
    name: 'Carrom',
    formats: [FormatType.Singles, FormatType.Doubles],
  },
  {
    id: 'pool',
    name: 'Pool',
    formats: [FormatType.Singles],
  },
  {
    id: 'foosball',
    name: 'Foosball',
    formats: [FormatType.Doubles],
  },
  {
    id: 'chess',
    name: 'Chess',
    formats: [FormatType.Singles],
  },
];
