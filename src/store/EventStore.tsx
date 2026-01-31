import React, { createContext, useContext, useState } from 'react';
import { Event, Fixture, Team, GenderType } from '../models/Event';
import { MOCK_EVENTS } from '../constants/mockEvents';

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
        if (event.registrations.length >= event.totalTeams) return event;

        return {
          ...event,
          registrations: [
            ...event.registrations,
            { id: Date.now().toString(), name, gender },
          ],
          registeredTeams: event.registeredTeams + 1,
        };
      }),
    );
  };

  const closeRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const participationRate = event.registrations.length / event.totalTeams;

        if (participationRate < 0.2) {
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

        const playersPerTeam = event.format === '2v2' ? 2 : 1;

        const totalPossibleTeams = Math.floor(
          event.registrations.length / playersPerTeam,
        );

        if (totalPossibleTeams < 2) return event;

        const shuffled = [...event.registrations].sort(
          () => Math.random() - 0.5,
        );

        const teams: Team[] = [];

        for (let index = 0; index < totalPossibleTeams; index++) {
          const players = shuffled.slice(
            index * playersPerTeam,
            index * playersPerTeam + playersPerTeam,
          );

          teams.push({
            id: `team-${index + 1}`,
            name: `Team ${index + 1}`,
            players,
            gender: players[0].gender,
          });
        }

        return {
          ...event,
          teams,
          teamsCreated: true,
        };
      }),
    );
  };

  const createFixtures = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;
        if (!event.teamsCreated || event.teams.length < 2) return event;

        const fixtures: Fixture[] = [];

        for (let index = 0; index < event.teams.length; index += 2) {
          if (!event.teams[index + 1]) break;

          fixtures.push({
            id: `fix-${Date.now()}-${index}`,
            teamA: event.teams[index].name,
            teamB: event.teams[index + 1].name,
            scoreA: 0,
            scoreB: 0,
            round: 1,
            time: new Date().toISOString(),
            status: 'UPCOMING',
          });
        }

        return {
          ...event,
          fixtures,
          fixturesCreated: true,
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
