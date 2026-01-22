import { useState } from 'react';
import { Event } from '../models/Event';

type Mode = 'create' | 'edit';

type Params = {
  mode: Mode;
  event?: Event;
  onSubmit: (event: Event) => void;
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

export const useEventFormViewModel = ({ mode, event, onSubmit }: Params) => {
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

    if (!name.trim()) newErrors.name = 'Event name is required';
    if (!sport.trim()) newErrors.sport = 'Sport is required';
    if (!format) newErrors.format = 'Format is required';
    if (!date.trim()) newErrors.date = 'Date is required';
    if (!time.trim()) newErrors.time = 'Time is required';
    if (!venue.trim()) newErrors.venue = 'Venue is required';

    if (!totalTeams || Number(totalTeams) <= 0) {
      newErrors.totalTeams = 'Enter valid team count';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = () => {
    if (!validate()) return false;

    const updatedEvent: Event = {
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

    onSubmit(updatedEvent);
    return true;
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
