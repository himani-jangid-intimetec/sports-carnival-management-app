import { useMemo } from 'react';
import { useEventStore } from '../../store/EventStore';
import { APP_STRINGS } from '../../constants/AppStrings';
import { Event, EventStatus } from '../../models/Event';

export const useEventDetailsViewModel = (eventId: string) => {
  const { events } = useEventStore();

  const event: Event | undefined = useMemo(() => {
    return events.find((event) => event.id === eventId);
  }, [events, eventId]);

  const registrationEnded = useMemo(() => {
    if (!event || !event.registrationDeadline) return false;
    return new Date(event.registrationDeadline) < new Date();
  }, [event]);

  const isCompleted = event?.status === EventStatus.COMPLETED;

  const canRegister = useMemo(() => {
    if (!event) return false;

    return (
      !registrationEnded &&
      !isCompleted &&
      event.registeredTeams < event.totalTeams
    );
  }, [event, registrationEnded, isCompleted]);

  const canCreateTeams = useMemo(() => {
    if (!event) return false;
    return !event.teamsCreated && !isCompleted;
  }, [event, isCompleted]);

  const canCreateFixtures = useMemo(() => {
    if (!event) return false;
    return event.teamsCreated && !event.fixturesCreated && !isCompleted;
  }, [event, isCompleted]);

  const statusText = useMemo(() => {
    if (!event) return '';

    if (isCompleted) return APP_STRINGS.eventScreen.eventCompleted;
    if (!registrationEnded) return APP_STRINGS.eventScreen.registrationOpen;
    if (event.teamsCreated && event.fixturesCreated)
      return APP_STRINGS.eventScreen.fixturesReady;
    if (event.teamsCreated) return APP_STRINGS.eventScreen.teamsCreated;

    return APP_STRINGS.eventScreen.registrationClosed;
  }, [event, isCompleted, registrationEnded]);

  const getRoundName = (round: number, totalPlayers: number) => {
    const bracketSize = Math.pow(2, Math.ceil(Math.log2(totalPlayers)));
    const totalRounds = Math.log2(bracketSize);

    const roundsLeft = totalRounds - round + 1;

    if (roundsLeft === 1) return APP_STRINGS.eventScreen.final;
    if (roundsLeft === 2) return APP_STRINGS.eventScreen.semiFinal;
    if (roundsLeft === 3) return APP_STRINGS.eventScreen.quarterFinal;

    return `Round ${round}`;
  };

  return {
    event,
    canRegister,
    canCreateTeams,
    canCreateFixtures,
    statusText,
    getRoundName,
  };
};
