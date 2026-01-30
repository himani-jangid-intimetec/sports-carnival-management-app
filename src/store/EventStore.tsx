import React, { createContext, useContext, useState } from 'react';
import { Event } from '../models/Event';
import { MOCK_EVENTS } from '../constants/mockEvents';
import { generateRoundRobinFixtures } from '../utils/fixturesGenerator';

type EventContextType = {
  events: Event[];

  createEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (eventId: string) => void;

  registerTeam: (eventId: string) => void;
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
    setEvents((prev: Event[]) => [...prev, event]);
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents((prev: Event[]) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev: Event[]) => prev.filter((event) => event.id !== eventId));
  };

  const registerTeam = (eventId: string) => {
    setEvents((prev: Event[]) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        if (event.registeredTeams >= event.totalTeams) return event;

        return {
          ...event,
          registeredTeams: event.registeredTeams + 1,
        };
      }),
    );
  };

  const closeRegistration = (eventId: string) => {
    setEvents((prev: Event[]) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const participationRate = event.registeredTeams / event.totalTeams;

        if (participationRate < 0.2) {
          return { ...event, status: 'CANCELLED' };
        }

        return { ...event, status: 'UPCOMING' };
      }),
    );
  };

  const extendRegistration = (eventId: string, newDeadline: string) => {
    setEvents((prev: Event[]) =>
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

        if (event.registeredTeams < 2) return event;

        if (event.format === '1v1') {
          return {
            ...event,
            teamsCreated: true,
          };
        }

        const teamCount = Math.floor(event.registeredTeams / 2);

        const newTeams = Array.from({ length: teamCount }).map((_, index) => ({
          id: `team-${Date.now()}-${index}`,
          name: `Team ${index + 1}`,
          players: [`Player ${index * 2 + 1}`, `Player ${index * 2 + 2}`],
          gender: 'Male' as const,
        }));

        return {
          ...event,
          teams: newTeams,
          teamsCreated: true,
        };
      }),
    );
  };

  const createFixtures = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        let participants: string[] = [];

        if (event.format === '1v1') {
          participants = event.teams.flatMap((team) => team.players);
        }

        if (event.format === '2v2') {
          participants = event.teams.map((team) => team.name);
        }

        if (participants.length < 2) return event;

        const fixtures = generateRoundRobinFixtures(participants);

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
        registerTeam,
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
