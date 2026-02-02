import React, { createContext, useContext, useState } from 'react';
import {
  Event,
  Fixture,
  Team,
  GenderType,
  Registration,
} from '../models/Event';
import { MOCK_EVENTS } from '../constants/MockEvents';

type EventContextType = {
  events: Event[];

  createEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;

  registerParticipant: (
    eventId: string,
    name: string,
    gender: GenderType,
  ) => void;

  closeRegistration: (eventId: string) => void;
  extendRegistration: (eventId: string, newDeadline: string) => void;

  createTeams: (eventId: string) => void;
  createFixtures: (eventId: string) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  const createEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const registerParticipant = (
    eventId: string,
    name: string,
    gender: GenderType,
  ) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const maxParticipants =
          event.format === '1v1' ? event.totalTeams : event.totalTeams * 2;

        if (event.registrations.length >= maxParticipants) return event;

        return {
          ...event,
          registrations: [
            ...event.registrations,
            { id: Date.now().toString(), name, gender },
          ],
          registeredTeams: event.registrations.length + 1,
        };
      }),
    );
  };

  const closeRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const participationRate = event.registrations.length / event.totalTeams;

        const minParticipationRate = 0.2;

        if (participationRate < minParticipationRate) {
          return { ...event, status: 'CANCELLED' };
        }

        return { ...event, status: 'UPCOMING' };
      }),
    );
  };

  const extendRegistration = (eventId: string, newDeadline: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? { ...event, registrationDeadline: newDeadline }
          : event,
      ),
    );
  };

  const createTeams = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;
        if (event.format === '1v1') return event;

        const requiredPlayers = event.totalTeams * 2;
        if (event.registrations.length < requiredPlayers) return event;

        const males = event.registrations.filter(
          (player) => player.gender === 'Male',
        );
        const females = event.registrations.filter(
          (player) => player.gender === 'Female',
        );

        const teams: Team[] = [];
        let teamIndex = 1;

        const buildTeams = (players: Registration[]) => {
          for (let index = 0; index + 1 < players.length; index += 2) {
            if (teams.length >= event.totalTeams) break;
            teams.push({
              id: teamIndex.toString(),
              name: `Team ${teamIndex}`,
              players: players.slice(index, index + 2),
              gender: players[index].gender,
            });
            teamIndex++;
          }
        };

        buildTeams(males);
        buildTeams(females);

        if (teams.length < event.totalTeams) return event;

        return { ...event, teams, teamsCreated: true };
      }),
    );
  };

  const createFixtures = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const fixtures: Fixture[] = [];
        const round = 1;
        let matchIndex = 1;

        if (event.format === '1v1') {
          const males = event.registrations.filter(
            (player) => player.gender === 'Male',
          );
          const females = event.registrations.filter(
            (player) => player.gender === 'Female',
          );

          const build = (players: Registration[]) => {
            for (let index = 0; index + 1 < players.length; index += 2) {
              fixtures.push({
                id: `R${round}-M${matchIndex}`,
                teamA: players[index].name,
                teamB: players[index + 1].name,
                scoreA: 0,
                scoreB: 0,
                time: new Date().toISOString(),
                round,
                status: 'UPCOMING',
              });
              matchIndex++;
            }
          };

          build(males);
          build(females);
        }

        if (event.format === '2v2' && event.teamsCreated) {
          for (let index = 0; index + 1 < event.teams.length; index += 2) {
            fixtures.push({
              id: `R${round}-M${matchIndex}`,
              teamA: event.teams[index].name,
              teamB: event.teams[index + 1].name,
              scoreA: 0,
              scoreB: 0,
              time: new Date().toISOString(),
              round,
              status: 'UPCOMING',
            });
            matchIndex++;
          }
        }

        return {
          ...event,
          fixtures,
          fixturesCreated: true,
          status: 'LIVE',
        };
      }),
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        updateEvent,
        deleteEvent,
        registerParticipant,
        closeRegistration,
        extendRegistration,
        createTeams,
        createFixtures,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventStore = () => {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error('useEventStore must be used inside EventProvider');
  }
  return ctx;
};
