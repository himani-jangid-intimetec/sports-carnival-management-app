import { useMemo } from 'react';
import { useEventStore } from '../../store/EventStore';
import { APP_STRINGS } from '../../constants/appStrings';

export const useEventDetailsViewModel = (eventId: string) => {
  const { events } = useEventStore();

  const event = useMemo(() => {
    return events.find((event) => event.id === eventId);
  }, [events, eventId]);

  if (!event) {
    throw new Error(APP_STRINGS.eventScreen.noEventFound);
  }

  const registrationEnded = useMemo(() => {
    if (!event.registrationDeadline) return false;
    return new Date(event.registrationDeadline) < new Date();
  }, [event.registrationDeadline]);

  const isCompleted = event.status === 'COMPLETED';

  const canRegister = useMemo(() => {
    return (
      !registrationEnded &&
      !isCompleted &&
      event.registeredTeams < event.totalTeams
    );
  }, [registrationEnded, isCompleted, event.registeredTeams, event.totalTeams]);

  const canCreateTeams = useMemo(() => {
    return !event.teamsCreated && !isCompleted;
  }, [event.teamsCreated, isCompleted]);

  const canCreateFixtures = useMemo(() => {
    return event.teamsCreated && !event.fixturesCreated && !isCompleted;
  }, [event.teamsCreated, event.fixturesCreated, isCompleted]);

  const statusText = useMemo(() => {
    if (isCompleted) return APP_STRINGS.eventScreen.eventCompleted;
    if (!registrationEnded) return APP_STRINGS.eventScreen.registrationOpen;
    if (event.teamsCreated && event.fixturesCreated)
      return APP_STRINGS.eventScreen.fixturesReady;
    if (event.teamsCreated) return APP_STRINGS.eventScreen.teamsCreated;
    return APP_STRINGS.eventScreen.registrationClosed;
  }, [
    isCompleted,
    registrationEnded,
    event.teamsCreated,
    event.fixturesCreated,
  ]);

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
