import { useMemo } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { useEventStore } from '../store/EventStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Team, Fixture } from '../models/Event';

type MyTeamData = {
  team: Team;
  eventName: string;
  sport: string;
};

type TodayMatchData = {
  fixture: Fixture;
  eventName: string;
  sport: string;
};

export const useParticipantHomeViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  const { logout, user } = useAuthStore();
  const { events } = useEventStore();

  const myTeams: MyTeamData[] = useMemo(() => {
    if (!user) return [];

    const teams: MyTeamData[] = [];
    events.forEach((event) => {
      event.teams.forEach((team) => {
        const isPlayerInTeam = team.players.some(
          (player) => player.name.toLowerCase() === user.name.toLowerCase(),
        );
        if (isPlayerInTeam) {
          teams.push({
            team,
            eventName: event.name,
            sport: event.sport,
          });
        }
      });
    });
    return teams;
  }, [events, user]);

  const todaysMatches: TodayMatchData[] = useMemo(() => {
    if (!user) return [];

    const today = new Date().toISOString().split('T')[0];
    const matches: TodayMatchData[] = [];

    events.forEach((event) => {
      if (event.date !== today) return;

      event.fixtures.forEach((fixture) => {
        const userTeamNames = myTeams.map((teams) => teams.team.name);
        const isUserInvolved =
          userTeamNames.includes(fixture.teamA) ||
          userTeamNames.includes(fixture.teamB) ||
          fixture.teamA.toLowerCase() === user.name.toLowerCase() ||
          fixture.teamB.toLowerCase() === user.name.toLowerCase();

        if (isUserInvolved && fixture.status !== 'COMPLETED') {
          matches.push({
            fixture,
            eventName: event.name,
            sport: event.sport,
          });
        }
      });
    });

    return matches;
  }, [events, user, myTeams]);

  const myEventsCount = useMemo(() => {
    if (!user) return 0;
    return events.filter((event) =>
      event.registrations.some(
        (reg) => reg.name.toLowerCase() === user.name.toLowerCase(),
      ),
    ).length;
  }, [events, user]);

  const matchesPlayedCount = useMemo(() => {
    if (!user) return 0;
    let count = 0;
    const userTeamNames = myTeams.map((teams) => teams.team.name);

    events.forEach((event) => {
      event.fixtures.forEach((fixture) => {
        const isUserInvolved =
          userTeamNames.includes(fixture.teamA) ||
          userTeamNames.includes(fixture.teamB) ||
          fixture.teamA.toLowerCase() === user.name.toLowerCase() ||
          fixture.teamB.toLowerCase() === user.name.toLowerCase();

        if (isUserInvolved && fixture.status === 'COMPLETED') {
          count++;
        }
      });
    });
    return count;
  }, [events, user, myTeams]);

  const winsCount = useMemo(() => {
    if (!user) return 0;
    let count = 0;
    const userTeamNames = myTeams.map((teams) => teams.team.name);

    events.forEach((event) => {
      event.fixtures.forEach((fixture) => {
        if (fixture.status !== 'COMPLETED' || !fixture.winner) return;

        const isWinner =
          userTeamNames.includes(fixture.winner) ||
          fixture.winner.toLowerCase() === user.name.toLowerCase();

        if (isWinner) {
          count++;
        }
      });
    });
    return count;
  }, [events, user, myTeams]);

  const onLogout = async () => {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', params: { screen: 'Login' } }],
    });
  };

  return {
    user,
    onLogout,
    myTeams,
    todaysMatches,
    myEventsCount,
    myTeamsCount: myTeams.length,
    matchesPlayedCount,
    winsCount,
  };
};
