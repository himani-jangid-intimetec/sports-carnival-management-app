import { useMemo, useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Event, Fixture } from '../models/Event';
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
  };

  const handleCreateTeams = () => {
    if (!selectedEvent) return;

    const playersPerTeam = selectedEvent.format === '2v2' ? 2 : 1;

    const males = selectedEvent.registrations.filter(
      (participant) => participant.gender === 'Male',
    );
    const females = selectedEvent.registrations.filter(
      (participant) => participant.gender === 'Female',
    );

    const buildTeams = (players: typeof selectedEvent.registrations) => {
      const shuffled = [...players].sort(() => Math.random() - 0.5);
      const teams = [];

      for (let index = 0; index < shuffled.length; index += playersPerTeam) {
        const chunk = shuffled.slice(index, index + playersPerTeam);
        if (chunk.length < playersPerTeam) break;

        teams.push({
          id: `team-${Date.now()}-${index}`,
          name: `Team ${teams.length + 1}`,
          players: chunk.map((player) => player.name),
          gender: chunk[0].gender,
        });
      }

      return teams;
    };

    const maleTeams = buildTeams(males);
    const femaleTeams = buildTeams(females);

    const allTeams = [...maleTeams, ...femaleTeams];

    const updatedEvent: Event = {
      ...selectedEvent,
      teams: allTeams,
      teamsCreated: true,
    };

    updateEvent(updatedEvent);
  };

  const handleCreateFixtures = () => {
    if (!selectedEvent) return;

    if (!selectedEvent.teamsCreated || !selectedEvent.teams.length) {
      Alert.alert(APP_STRINGS.eventScreen.createTeamFirst);
      return;
    }

    const fixtures: Fixture[] = [];

    for (let index = 0; index < selectedEvent.teams.length; index++) {
      for (
        let iterator = index + 1;
        iterator < selectedEvent.teams.length;
        iterator++
      ) {
        fixtures.push({
          id: `fix-${Date.now()}-${index}-${iterator}`,
          teamA: selectedEvent.teams[index].name,
          teamB: selectedEvent.teams[iterator].name,
          scoreA: 0,
          scoreB: 0,
          time: new Date().toISOString(),
          round: 1,
          status: 'UPCOMING',
        });
      }
    }

    const updatedEvent: Event = {
      ...selectedEvent,
      fixtures,
      fixturesCreated: true,
    };

    updateEvent(updatedEvent);
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

    const completed = selectedEvent.fixtures.filter(
      (f) => f.status === 'COMPLETED' && f.round === 1,
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
        time: new Date().toISOString(),
        round: 2,
        status: 'UPCOMING',
      });
    }

    const updatedEvent: Event = {
      ...selectedEvent,
      fixtures: [...selectedEvent.fixtures, ...nextRoundFixtures],
    };

    updateEvent(updatedEvent);
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
    onRegister,

    handleCreateTeams,
    handleCreateFixtures,
    completeMatch,
    createNextRound,
    getRoundName,
  };
};
