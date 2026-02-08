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

  const getRoundName = (round: number, totalTeams: number) => {
    const totalRounds = Math.log2(totalTeams);

    if (round === totalRounds) return APP_STRINGS.eventScreen.final;
    if (round === totalRounds - 1) return APP_STRINGS.eventScreen.semiFinal;
    if (round === totalRounds - 2) return APP_STRINGS.eventScreen.quarterFinal;

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
