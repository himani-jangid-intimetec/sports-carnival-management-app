export type Team = {
  id: string;
  name: string;
  captain: string;
  currentPlayers: number;
  totalPlayers: number;
  sport: 'BADMINTON' | 'CARROM' | 'FOOSBALL' | 'TABLE TENNIS' | 'POOL';
  wins: number;
  losses: number;
};
