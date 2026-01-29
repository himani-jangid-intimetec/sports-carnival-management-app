export type GameFormat = '1v1' | '2v2';

export type Game = {
  id: string;
  name: string;
  formats: GameFormat[];
};

export const GAMES: Game[] = [
  {
    id: 'badminton',
    name: 'Badminton',
    formats: ['1v1', '2v2'],
  },
  {
    id: 'table_tennis',
    name: 'Table Tennis',
    formats: ['1v1', '2v2'],
  },
  {
    id: 'carrom',
    name: 'Carrom',
    formats: ['1v1', '2v2'],
  },
  {
    id: 'pool',
    name: 'Pool',
    formats: ['1v1'],
  },
  {
    id: 'foosball',
    name: 'Foosball',
    formats: ['2v2'],
  },
];
