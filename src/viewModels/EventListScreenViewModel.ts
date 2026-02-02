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

    const playersPerTeam = 2;
    const requiredPlayers = selectedEvent.totalTeams * playersPerTeam;

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

    const createTeamsFromGroup = (players: typeof males) => {
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

    createTeamsFromGroup(males);
    createTeamsFromGroup(females);

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

  const handleCreateFixtures = () => {
    if (!selectedEvent) return;

    const fixtures: Fixture[] = [];
    const round = 1;

    if (selectedEvent.format === '1v1') {
      const males = selectedEvent.registrations.filter(
        (player) => player.gender === 'Male',
      );
      const females = selectedEvent.registrations.filter(
        (player) => player.gender === 'Female',
      );

      const createFixturesFromPlayers = (players: typeof males) => {
        const shuffled = [...players].sort(() => Math.random() - 0.5);

        for (let index = 0; index + 1 < shuffled.length; index += 2) {
          fixtures.push({
            id: generateFixtureId(),
            teamA: shuffled[index].name,
            teamB: shuffled[index + 1].name,
            scoreA: 0,
            scoreB: 0,
            round,
            time: new Date().toISOString(),
            status: 'UPCOMING',
          });
        }
      };

      createFixturesFromPlayers(males);
      createFixturesFromPlayers(females);

      if (fixtures.length === 0) {
        Alert.alert(APP_STRINGS.eventScreen.notEnoughSameGenderParticipants);
        return;
      }

      updateEvent({
        ...selectedEvent,
        fixtures,
        fixturesCreated: true,
        status: 'LIVE',
      });

      return;
    }

    if (!selectedEvent.teamsCreated || selectedEvent.teams.length < 2) {
      Alert.alert(APP_STRINGS.eventScreen.createTeamFirst);
      return;
    }

    const teams = [...selectedEvent.teams].sort(() => Math.random() - 0.5);

    for (let index = 0; index + 1 < teams.length; index += 2) {
      fixtures.push({
        id: generateFixtureId(),
        teamA: teams[index].name,
        teamB: teams[index + 1].name,
        scoreA: 0,
        scoreB: 0,
        round,
        time: new Date().toISOString(),
        status: 'UPCOMING',
      });
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

    const updatedFixtures: Fixture[] = selectedEvent.fixtures.map((fixture) => {
      if (fixture.id !== fixtureId) return fixture;

      const scoreA = Math.floor(Math.random() * 10);
      const scoreB = Math.floor(Math.random() * 10);

      return {
        ...fixture,
        scoreA,
        scoreB,
        status: 'COMPLETED',
        winner: scoreA > scoreB ? fixture.teamA : fixture.teamB,
      };
    });

    updateEvent({
      ...selectedEvent,
      fixtures: updatedFixtures,
    });
  };

  const createNextRound = () => {
    if (!selectedEvent) return;

    const lastRound = Math.max(
      ...selectedEvent.fixtures.map((fixture) => fixture.round),
    );

    const completed = selectedEvent.fixtures.filter(
      (fixture) =>
        fixture.round === lastRound && fixture.status === 'COMPLETED',
    );

    if (completed.length < 2) {
      Alert.alert(APP_STRINGS.eventScreen.notEnoughCompletedMatches);
      return;
    }

    const winners = completed.map((fixture) => fixture.winner!).filter(Boolean);
    const nextRoundFixtures: Fixture[] = [];

    for (let index = 0; index + 1 < winners.length; index += 2) {
      nextRoundFixtures.push({
        id: generateFixtureId(),
        teamA: winners[index],
        teamB: winners[index + 1],
        scoreA: 0,
        scoreB: 0,
        round: lastRound + 1,
        time: new Date().toISOString(),
        status: 'UPCOMING',
      });
    }

    updateEvent({
      ...selectedEvent,
      fixtures: [...selectedEvent.fixtures, ...nextRoundFixtures],
    });
  };

  const getRoundName = (round: number, totalTeams: number) => {
    const totalRounds = Math.log2(totalTeams);

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
    createNextRound,
    getRoundName,
  };
};
