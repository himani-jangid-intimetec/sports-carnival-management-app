import { useMemo, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Event, Fixture, Team } from '../models/Event';
import { useEventStore } from '../store/EventStore';
import { APP_STRINGS } from '../constants/appStrings';

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

  const onRegister = (name: string, gender: 'Male' | 'Female') => {
    if (!selectedEvent) return;

    if (selectedEvent.registeredTeams >= selectedEvent.totalTeams) {
      Alert.alert(
        APP_STRINGS.eventScreen.eventFull,
        APP_STRINGS.eventScreen.noMoreSlots,
      );
      return;
    }

    const updatedEvent: Event = {
      ...selectedEvent,
      registrations: [
        ...selectedEvent.registrations,
        {
          id: Date.now().toString(),
          name,
          gender,
        },
      ],
      registeredTeams: selectedEvent.registeredTeams + 1,
    };

    updateEvent(updatedEvent);

    Alert.alert(
      APP_STRINGS.eventScreen.registered,
      APP_STRINGS.eventScreen.registrationSuccessfull,
    );
  };

  const handleCreateTeams = () => {
    if (!selectedEvent) return;

    let playersPerTeam = selectedEvent.format === '2v2' ? 2 : 1;

    if (selectedEvent.sport.toLowerCase() === 'chess') {
      playersPerTeam = 1;
    }

    const registrations = [...selectedEvent.registrations];

    if (registrations.length < playersPerTeam * selectedEvent.totalTeams) {
      Alert.alert(APP_STRINGS.eventScreen.noEnoughRegistrations);
      return;
    }

    const shuffled = registrations.sort(() => Math.random() - 0.5);

    const teams: Team[] = [];

    for (let index = 0; index < selectedEvent.totalTeams; index++) {
      const teamPlayers = shuffled.slice(
        index * playersPerTeam,
        index * playersPerTeam + playersPerTeam,
      );

      teams.push({
        id: (index + 1).toString(),
        name: `Team ${index + 1}`,
        players: teamPlayers,
        gender: teamPlayers[0].gender,
      });
    }

    updateEvent({
      ...selectedEvent,
      teams,
      teamsCreated: true,
    });
  };

  const handleCreateFixtures = () => {
    if (!selectedEvent) return;

    if (!selectedEvent.teamsCreated || selectedEvent.teams.length < 2) {
      Alert.alert(APP_STRINGS.eventScreen.createTeamFirst);
      return;
    }

    const fixtures: Fixture[] = [];
    const teams = selectedEvent.teams;

    for (let index = 0; index < teams.length; index += 2) {
      if (!teams[index + 1]) break;

      fixtures.push({
        id: `fix-${Date.now()}-${index}`,
        teamA: teams[index].name,
        teamB: teams[index + 1].name,
        scoreA: 0,
        scoreB: 0,
        round: 1,
        time: new Date().toISOString(),
        status: 'UPCOMING',
      });
    }

    updateEvent({
      ...selectedEvent,
      fixtures,
      fixturesCreated: true,
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

    const updatedEvent: Event = {
      ...selectedEvent,
      fixtures: updatedFixtures,
    };

    updateEvent(updatedEvent);
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

    for (let index = 0; index < winners.length; index += 2) {
      if (!winners[index + 1]) break;

      nextRoundFixtures.push({
        id: `fix-${Date.now()}-${index}`,
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

    if (round === totalRounds) return 'Final';
    if (round === totalRounds - 1) return 'Semi Final';
    if (round === totalRounds - 2) return 'Quarter Final';

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
    onRegister,

    handleCreateTeams,
    handleCreateFixtures,
    completeMatch,
    createNextRound,
    getRoundName,
  };
};
