import React, { createContext, useContext, useState } from 'react';
import {
  Event,
  EventStatus,
  GenderType,
  FormatType,
  MatchStatus,
  Fixture,
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
    formats: FormatType[],
  ) => void;

  closeRegistration: (eventId: string) => void;
  extendRegistration: (eventId: string, newDeadline: string) => void;

  updateFixtureStatus: (
    eventId: string,
    fixtureId: string,
    status: MatchStatus,
  ) => void;

  updateFixtureScore: (
    eventId: string,
    fixtureId: string,
    scoreA: number,
    scoreB: number,
  ) => void;

  completeFixture: (
    eventId: string,
    fixtureId: string,
    scoreA: number,
    scoreB: number,
  ) => void;
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
    formats: FormatType[],
  ) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        return {
          ...event,
          registrations: [
            ...event.registrations,
            {
              id: Date.now().toString(),
              name,
              gender,
              formats,
            },
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

        const genders: GenderType[] = [GenderType.Male, GenderType.Female];
        const formats = event.formats ?? [
          FormatType.Singles,
          FormatType.Doubles,
        ];
        const minRequired = Math.ceil(event.totalTeams * 0.2);
        const abandonedCategories: string[] = [];

        genders.forEach((gender) => {
          formats.forEach((format) => {
            const participantCount = event.registrations.filter(
              (player) =>
                player.gender === gender && player.formats?.includes(format),
            ).length;

            if (participantCount < minRequired) {
              abandonedCategories.push(`${gender}-${format}`);
            }
          });
        });

        const totalCategories = genders.length * formats.length;
        const allAbandoned = abandonedCategories.length === totalCategories;

        return {
          ...event,
          status: allAbandoned ? EventStatus.CANCELLED : EventStatus.UPCOMING,
          abandonedCategories,
        };
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

  const updateFixtureStatus = (
    eventId: string,
    fixtureId: string,
    status: MatchStatus,
  ) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        return {
          ...event,
          fixtures: event.fixtures.map((fixture) =>
            fixture.id === fixtureId ? { ...fixture, status } : fixture,
          ),
        };
      }),
    );
  };

  const updateFixtureScore = (
    eventId: string,
    fixtureId: string,
    scoreA: number,
    scoreB: number,
  ) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        return {
          ...event,
          fixtures: event.fixtures.map((fixture) =>
            fixture.id === fixtureId ? { ...fixture, scoreA, scoreB } : fixture,
          ),
        };
      }),
    );
  };

  const completeFixture = (
    eventId: string,
    fixtureId: string,
    scoreA: number,
    scoreB: number,
  ) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event;

        const currentFixture = event.fixtures.find(
          (fixture) => fixture.id === fixtureId,
        );
        if (!currentFixture) return event;

        const winner =
          scoreA > scoreB ? currentFixture.teamA : currentFixture.teamB;

        const updatedFixtures: Fixture[] = event.fixtures.map((fixture) =>
          fixture.id === fixtureId
            ? {
                ...fixture,
                scoreA,
                scoreB,
                status: MatchStatus.COMPLETED,
                winner,
              }
            : fixture,
        );

        const nextRound = currentFixture.round + 1;
        const nextBracketPosition = Math.floor(
          currentFixture.bracketPosition / 2,
        );
        const isTeamA = currentFixture.bracketPosition % 2 === 0;

        const nextFixtureIndex = updatedFixtures.findIndex(
          (fixture) =>
            fixture.round === nextRound &&
            fixture.bracketPosition === nextBracketPosition &&
            fixture.gender === currentFixture.gender &&
            fixture.format === currentFixture.format,
        );

        if (nextFixtureIndex !== -1) {
          const nextFixture = updatedFixtures[nextFixtureIndex];

          updatedFixtures[nextFixtureIndex] = {
            ...nextFixture,
            teamA: isTeamA ? winner : nextFixture.teamA,
            teamB: !isTeamA ? winner : nextFixture.teamB,
          };
        }

        return {
          ...event,
          fixtures: updatedFixtures,
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
        updateFixtureStatus,
        updateFixtureScore,
        completeFixture,
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
