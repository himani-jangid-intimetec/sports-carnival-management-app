import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useEventStore } from '../store/EventStore';
import { APP_STRINGS } from '../constants/AppStrings';
import { Fixture, FormatType, GenderType, Team } from '../models/Event';

type CategoryDetailsRouteProp = RouteProp<
  RootStackParamList,
  'CategoryDetails'
>;

export type FixtureTabType = 'ALL' | 'LIVE' | 'UPCOMING' | 'COMPLETED';

const nextPowerOfTwo = (n: number) => Math.pow(2, Math.ceil(Math.log2(n)));
const generateFixtureId = () =>
  `fix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useCategoryDetailsViewModel = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<CategoryDetailsRouteProp>();
  const { eventId, gender, format, role } = route.params;

  const {
    events,
    updateEvent,
    updateFixtureStatus,
    updateFixtureScore,
    completeFixture,
  } = useEventStore();

  const event = useMemo(
    () => events.find((event) => event.id === eventId) ?? null,
    [events, eventId],
  );

  const mainTabs = useMemo(() => {
    const tabs = ['PARTICIPANTS'];
    if (format === 'Doubles') tabs.push('TEAMS');
    tabs.push('FIXTURES');
    return tabs;
  }, [format]);

  const [activeMainTab, setActiveMainTab] = useState(mainTabs[0]);
  const [activeFixtureTab, setActiveFixtureTab] =
    useState<FixtureTabType>('ALL');

  const isAdminOrOrganizer = role === 'admin' || role === 'organizer';

  const participants = useMemo(() => {
    if (!event) return [];
    return event.registrations.filter(
      (player) => player.gender === gender && player.formats?.includes(format),
    );
  }, [event, gender, format]);

  const teams = useMemo(() => {
    if (!event) return [];
    return event.teams.filter(
      (team) => team.gender === gender && team.format === format,
    );
  }, [event, gender, format]);

  const fixtures = useMemo(() => {
    if (!event) return [];
    return event.fixtures.filter(
      (fixture) => fixture.gender === gender && fixture.format === format,
    );
  }, [event, gender, format]);

  const filteredFixtures = useMemo(() => {
    if (activeFixtureTab === 'ALL') return fixtures;
    return fixtures.filter((fixture) => fixture.status === activeFixtureTab);
  }, [fixtures, activeFixtureTab]);

  const getRoundName = (round: number, totalCount: number) => {
    const totalRounds = Math.log2(nextPowerOfTwo(totalCount));
    if (round === totalRounds) return APP_STRINGS.eventScreen.final;
    if (round === totalRounds - 1) return APP_STRINGS.eventScreen.semiFinal;
    if (round === totalRounds - 2) return APP_STRINGS.eventScreen.quarterFinal;
    return `Round ${round}`;
  };

  const generateBracket = (
    names: string[],
    bracketGender: GenderType,
    bracketFormat: FormatType,
  ): Fixture[] => {
    const generatedFixtures: Fixture[] = [];
    const teamList = [...names].sort(() => Math.random() - 0.5);
    const targetSize = nextPowerOfTwo(teamList.length);
    const totalRounds = Math.ceil(Math.log2(targetSize));

    while (teamList.length < targetSize) teamList.push('BYE');

    const round = 1;
    let bracketPosition = 0;

    for (let index = 0; index < teamList.length; index += 2) {
      const teamA = teamList[index];
      const teamB = teamList[index + 1];

      generatedFixtures.push({
        id: generateFixtureId(),
        teamA,
        teamB,
        scoreA: 0,
        scoreB: 0,
        round,
        totalRounds,
        time: new Date().toISOString(),
        status: teamA === 'BYE' || teamB === 'BYE' ? 'COMPLETED' : 'UPCOMING',
        winner: teamA === 'BYE' ? teamB : teamB === 'BYE' ? teamA : undefined,
        gender: bracketGender,
        format: bracketFormat,
        bracketPosition: bracketPosition++,
      });
    }

    return generatedFixtures;
  };

  const handleCreateTeams = () => {
    if (!event) return;

    if (format === 'Singles') {
      Alert.alert(APP_STRINGS.eventScreen.noTeamsRequired);
      return;
    }

    if (participants.length < 2) {
      Alert.alert(APP_STRINGS.eventScreen.noEnoughRegistrations);
      return;
    }

    const newTeams: Team[] = [];
    let teamIndex = event.teams.length + 1;

    for (let index = 0; index + 1 < participants.length; index += 2) {
      const pair = participants.slice(index, index + 2);
      newTeams.push({
        id: `team-${Date.now()}-${teamIndex}`,
        name: `Team ${teamIndex}`,
        players: pair,
        gender,
        format,
      });
      teamIndex++;
    }

    const otherTeams = event.teams.filter(
      (team) => !(team.gender === gender && team.format === format),
    );

    updateEvent({
      ...event,
      teams: [...otherTeams, ...newTeams],
      teamsCreated: true,
    });
  };

  const handleCreateFixtures = () => {
    if (!event) return;

    const names =
      format === 'Singles'
        ? participants.map((player) => player.name)
        : teams.map((team) => team.name);

    if (names.length < 2) {
      Alert.alert(APP_STRINGS.eventScreen.notEnoughSameGenderParticipants);
      return;
    }

    const newFixtures = generateBracket(names, gender, format);

    const otherFixtures = event.fixtures.filter(
      (fixture) => !(fixture.gender === gender && fixture.format === format),
    );

    updateEvent({
      ...event,
      fixtures: [...otherFixtures, ...newFixtures],
      fixturesCreated: true,
      status: 'LIVE',
    });
  };

  return {
    event,
    gender,
    format,
    role,
    navigation,
    mainTabs,
    activeMainTab,
    setActiveMainTab,
    activeFixtureTab,
    setActiveFixtureTab,
    participants,
    teams,
    filteredFixtures,
    isAdminOrOrganizer,
    hasTeamsForGender: teams.length > 0,
    hasFixturesForGender: fixtures.length > 0,
    getRoundName,
    handleCreateTeams,
    handleCreateFixtures,
    handleSetLive: (id: string) => updateFixtureStatus(eventId, id, 'LIVE'),
    handleUpdateScore: (id: string, a: number, b: number) =>
      updateFixtureScore(eventId, id, a, b),
    handleCompleteFixture: (id: string, a: number, b: number) =>
      completeFixture(eventId, id, a, b),
  };
};
