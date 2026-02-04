export type GameFormat = 'Singles' | 'Doubles';

export type Game = {
  id: string;
  name: string;
  formats: GameFormat[];
};

export const GAMES: Game[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    formats: ['Singles', 'Doubles'],
  },
  {
    id: 'table_tennis',
    name: 'Table Tennis',
    formats: ['Singles', 'Doubles'],
  },
  {
    id: 'carrom',
    name: 'Carrom',
    formats: ['Singles', 'Doubles'],
  },
  {
    id: 'pool',
    name: 'Pool',
    formats: ['Singles'],
  },
  {
    id: 'foosball',
    name: 'Foosball',
    formats: ['Doubles'],
  },
  {
    id: 'chess',
    name: 'Chess',
    formats: ['Singles'],
  },
];
