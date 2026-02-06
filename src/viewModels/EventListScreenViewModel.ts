import { useMemo, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Event, Fixture, Team } from '../models/Event';
import { useEventStore } from '../store/EventStore';
import { APP_STRINGS } from '../constants/AppStrings';

const generateFixtureId = () =>
  `fix-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const nextPowerOfTwo = (n: number) => Math.pow(2, Math.ceil(Math.log2(n)));

export const useEventsListViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  const { events, deleteEvent, updateEvent } = useEventStore();

  const [activeTab, setActiveTab] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const tabBarHeight = useBottomTabBarHeight();

  const selectedEvent = useMemo(
    () => events.find((event) => event.id === selectedEventId) ?? null,
    [events, selectedEventId],
  );

  const filteredEvents = useMemo(() => {
    if (activeTab === 'ALL') return events;
    return events.filter((event) => event.status === activeTab);
  }, [activeTab, events]);

  const onEventPress = (event: Event) => {
    setSelectedEventId(event.id);
    setShowModal(true);
  };

  const onCloseModal = () => setShowModal(false);

  const onCreateEvent = () => {
    setShowModal(false);
    navigation.navigate('EventForm', { mode: 'create' });
  };

  const onEditEvent = () => {
    if (!selectedEvent) return;
    setShowModal(false);
    navigation.navigate('EventForm', {
      mode: 'edit',
      event: selectedEvent,
    });
  };

  const onDeleteEvent = () => {
    if (!selectedEvent) return;
    deleteEvent(selectedEvent.id);
    setShowModal(false);
  };

  const handleCreateTeams = () => {
    if (!selectedEvent) return;

    if (selectedEvent.format === '1v1') {
      Alert.alert(APP_STRINGS.eventScreen.noTeamsRequired);
      return;
    }

    const requiredPlayers = selectedEvent.totalTeams * 2;

    if (selectedEvent.registrations.length < requiredPlayers) {
      Alert.alert(APP_STRINGS.eventScreen.noEnoughRegistrations);
      return;
    }

    const males = selectedEvent.registrations.filter(
      (player) => player.gender === 'Male',
    );
    const females = selectedEvent.registrations.filter(
      (player) => player.gender === 'Female',
    );

    const teams: Team[] = [];
    let teamIndex = 1;

    const buildTeams = (players: typeof males) => {
      for (let index = 0; index + 1 < players.length; index += 2) {
        if (teams.length >= selectedEvent.totalTeams) break;

        const pair = players.slice(index, index + 2);

        teams.push({
          id: teamIndex.toString(),
          name: `Team ${teamIndex}`,
          players: pair,
          gender: pair[0].gender,
        });

        teamIndex++;
      }
    };

    buildTeams(males);
    buildTeams(females);

    if (teams.length < selectedEvent.totalTeams) {
      Alert.alert(APP_STRINGS.eventScreen.notEnoughSameGenderPairs);
      return;
    }

    updateEvent({
      ...selectedEvent,
      teams,
      teamsCreated: true,
    });
  };

  const generateBracket = (names: string[]): Fixture[] => {
    const fixtures: Fixture[] = [];

    let teams = [...names].sort(() => Math.random() - 0.5);
    const targetSize = nextPowerOfTwo(teams.length);

    while (teams.length < targetSize) teams.push('');

    let round = 1;

    while (teams.length > 1) {
      const nextRound: string[] = [];

      for (let index = 0; index < teams.length; index += 2) {
        fixtures.push({
          id: generateFixtureId(),
          teamA: teams[index] || '',
          teamB: teams[index + 1] || '',
          scoreA: 0,
          scoreB: 0,
          round,
          time: new Date().toISOString(),
          status: 'UPCOMING',
        });

        nextRound.push('TBD');
      }

      teams = nextRound;
      round++;
    }

    return fixtures;
  };

  const handleCreateFixtures = () => {
    if (!selectedEvent) return;

    const fixtures: Fixture[] = [];

    if (selectedEvent.format === '1v1') {
      const males = selectedEvent.registrations
        .filter((player) => player.gender === 'Male')
        .map((player) => player.name);

      const females = selectedEvent.registrations
        .filter((player) => player.gender === 'Female')
        .map((player) => player.name);

      if (males.length >= 2) fixtures.push(...generateBracket(males));
      if (females.length >= 2) fixtures.push(...generateBracket(females));

      if (!fixtures.length) {
        Alert.alert(APP_STRINGS.eventScreen.notEnoughSameGenderParticipants);
        return;
      }
    } else {
      if (!selectedEvent.teamsCreated) {
        Alert.alert(APP_STRINGS.eventScreen.createTeamFirst);
        return;
      }

      const males = selectedEvent.teams
        .filter((team) => team.gender === 'Male')
        .map((team) => team.name);

      const females = selectedEvent.teams
        .filter((team) => team.gender === 'Female')
        .map((team) => team.name);

      if (males.length >= 2) fixtures.push(...generateBracket(males));
      if (females.length >= 2) fixtures.push(...generateBracket(females));

      if (!fixtures.length) {
        Alert.alert(APP_STRINGS.eventScreen.notEnoughSameGenderParticipants);
        return;
      }
    }

    updateEvent({
      ...selectedEvent,
      fixtures,
      fixturesCreated: true,
      status: 'LIVE',
    });
  };

  const completeMatch = (fixtureId: string) => {
    if (!selectedEvent) return;

    const fixtures = [...selectedEvent.fixtures];
    const index = fixtures.findIndex((fixture) => fixture.id === fixtureId);
    if (index === -1) return;

    const match = fixtures[index];

    const scoreA = Math.floor(Math.random() * 10);
    const scoreB = Math.floor(Math.random() * 10);

    const winner = scoreA > scoreB ? match.teamA : match.teamB;

    fixtures[index] = {
      ...match,
      scoreA,
      scoreB,
      status: 'COMPLETED',
      winner,
    };

    const sameRound = fixtures.filter(
      (fixture) => fixture.round === match.round,
    );
    const matchPos = sameRound.findIndex((fixture) => fixture.id === match.id);
    const targetIndex = Math.floor(matchPos / 2);

    const nextRoundMatches = fixtures.filter(
      (fixture) => fixture.round === match.round + 1,
    );

    if (nextRoundMatches[targetIndex]) {
      if (matchPos % 2 === 0) nextRoundMatches[targetIndex].teamA = winner;
      else nextRoundMatches[targetIndex].teamB = winner;
    }

    updateEvent({
      ...selectedEvent,
      fixtures,
    });
  };

  const getRoundName = (round: number, totalTeams: number) => {
    const totalRounds = Math.log2(nextPowerOfTwo(totalTeams));

    if (round === totalRounds) return APP_STRINGS.eventScreen.final;
    if (round === totalRounds - 1) return APP_STRINGS.eventScreen.semiFinal;
    if (round === totalRounds - 2) return APP_STRINGS.eventScreen.quarterFinal;

    return `Round ${round}`;
  };

  return {
    activeTab,
    setActiveTab,
    filteredEvents,
    tabBarHeight,

    showModal,
    selectedEventId,

    onEventPress,
    onCloseModal,
    onCreateEvent,
    onEditEvent,
    onDeleteEvent,

    handleCreateTeams,
    handleCreateFixtures,
    completeMatch,
    getRoundName,
  };
};
