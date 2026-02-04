import { Fixture, GenderType, FormatType } from '../models/Event';

export const generateRoundRobinFixtures = (
  participants: string[],
  gender: GenderType = 'Male',
  format: FormatType = 'Singles',
): Fixture[] => {
  const fixtures: Fixture[] = [];
  let matchNumber = 1;
  const totalRounds = participants.length - 1;

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
        totalRounds,
        status: 'UPCOMING',
        gender,
        format,
        bracketPosition: matchNumber - 1,
      });
      matchNumber++;
    }
  }

  return fixtures;
};
