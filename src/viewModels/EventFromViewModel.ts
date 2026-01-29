import { useState } from 'react';
import { Event } from '../models/Event';
import { validationMessages } from '../constants/validationMessages';

type Mode = 'create' | 'edit';

type EventFormParams = {
  mode: Mode;
  event?: Event;
};

type EventFormErrors = {
  name?: string;
  sport?: string;
  format?: string;
  date?: string;
  time?: string;
  venue?: string;
  totalTeams?: string;
};

export const useEventFormViewModel = ({ mode, event }: EventFormParams) => {
  const isEdit = mode === 'edit' && !!event;

  const [name, setName] = useState(isEdit ? event!.name : '');
  const [sport, setSport] = useState(isEdit ? event!.sport : '');
  const [format, setFormat] = useState<'1v1' | '2v2'>(
    isEdit ? event!.format : '1v1',
  );
  const [date, setDate] = useState(isEdit ? event!.date : '');
  const [time, setTime] = useState(isEdit ? event!.time : '');
  const [venue, setVenue] = useState(isEdit ? event!.venue : '');
  const [totalTeams, setTotalTeams] = useState(
    isEdit ? String(event!.totalTeams) : '',
  );

  const [errors, setErrors] = useState<EventFormErrors>({});

  const validate = () => {
    const newErrors: EventFormErrors = {};

    if (!name.trim()) newErrors.name = validationMessages.REQUIRED_EVENT_NAME;
    if (!sport.trim()) newErrors.sport = validationMessages.REQUIRED_SPORT;
    if (!format) newErrors.format = validationMessages.REQUIRED_FORMAT;
    if (!date.trim()) newErrors.date = validationMessages.REQUIRED_DATE;
    if (!time.trim()) newErrors.time = validationMessages.REQUIRED_TIME;
    if (!venue.trim()) newErrors.venue = validationMessages.REQUIRED_VENUE;

    if (!totalTeams || Number(totalTeams) <= 0) {
      newErrors.totalTeams = validationMessages.INVALID_TEAM_COUNT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (): Event | null => {
    if (!validate()) return null;

    return {
      id: event?.id ?? Date.now().toString(),
      name,
      sport,
      format,
      date,
      time,
      venue,
      totalTeams: Number(totalTeams),

      status: event?.status ?? 'UPCOMING',
      registeredTeams: event?.registeredTeams ?? 0,
    };
  };

  return {
    isEdit,
    name,
    sport,
    format,
    date,
    time,
    venue,
    totalTeams,
    setName,
    setSport,
    setFormat,
    setDate,
    setTime,
    setVenue,
    setTotalTeams,
    errors,
    submit,
  };
};
