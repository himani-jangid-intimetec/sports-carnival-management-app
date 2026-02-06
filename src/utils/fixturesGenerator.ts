import { Fixture } from '../models/Event';

export const generateRoundRobinFixtures = (
  participants: string[],
): Fixture[] => {
  const fixtures: Fixture[] = [];
  let matchNumber = 1;

  for (let index = 0; index < participants.length; index++) {
    for (let iterator = index + 1; iterator < participants.length; iterator++) {
      fixtures.push({
        id: `fix-${Date.now()}-${index}-${iterator}`,
        teamA: participants[index],
        teamB: participants[iterator],
        scoreA: 0,
        scoreB: 0,
        time: new Date().toISOString(),
        round: matchNumber,
        status: 'UPCOMING',
      });
      matchNumber++;
    }
  }

  return fixtures;
};
