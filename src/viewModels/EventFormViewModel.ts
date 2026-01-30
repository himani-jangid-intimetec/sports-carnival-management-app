import { useState } from 'react';
import { Event } from '../models/Event';
import { validationMessages } from '../constants/validationMessages';
import { useEventStore } from '../store/EventStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Mode = 'create' | 'edit';

type EventFormParams = {
  mode: Mode;
  event?: Event;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type EventFormErrors = {
  name?: string;
  sport?: string;
  format?: string;
  date?: string;
  time?: string;
  venue?: string;
  totalTeams?: string;
  description?: string;
  rules?: string;
  prizes?: string;
};

export const useEventFormViewModel = ({
  mode,
  event,
  navigation,
}: EventFormParams) => {
  const { createEvent, updateEvent } = useEventStore();

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
  const [description, setDescription] = useState(
    isEdit ? event!.description : '',
  );

  const [rulesText, setRulesText] = useState(
    isEdit ? event!.rules.join('\n') : '',
  );

  const [firstPrize, setFirstPrize] = useState(
    isEdit ? event?.prizes[0] ?? '' : '',
  );
  const [secondPrize, setSecondPrize] = useState(
    isEdit ? event?.prizes[1] ?? '' : '',
  );
  const [thirdPrize, setThirdPrize] = useState(
    isEdit ? event?.prizes[2] ?? '' : '',
  );

  const [errors, setErrors] = useState<EventFormErrors>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());

  const openDatePicker = () => setShowDatePicker(true);
  const openTimePicker = () => setShowTimePicker(true);

  const onDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selected) {
      setPickerDate(selected);
      setDate(selected.toISOString().split('T')[0]);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selected?: Date) => {
    setShowTimePicker(false);
    if (event.type === 'set' && selected) {
      setPickerDate(selected);
      const hours = selected.getHours();
      const minutes = selected.getMinutes();
      const formatted = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
      setTime(formatted);
    }
  };

  const validate = () => {
    const newErrors: EventFormErrors = {};

    if (!name.trim()) newErrors.name = validationMessages.REQUIRED_EVENT_NAME;
    if (!sport.trim()) newErrors.sport = validationMessages.REQUIRED_SPORT;
    if (!format) newErrors.format = validationMessages.REQUIRED_FORMAT;
    if (!date.trim()) newErrors.date = validationMessages.REQUIRED_DATE;
    if (!time.trim()) newErrors.time = validationMessages.REQUIRED_TIME;
    if (!venue.trim()) newErrors.venue = validationMessages.REQUIRED_VENUE;
    if (!description.trim())
      newErrors.description = validationMessages.REQUIRED_DESCRIPTION;
    if (!rulesText.trim()) newErrors.rules = validationMessages.REQUIRED_RULES;
    if (!firstPrize.trim() || !secondPrize.trim() || !thirdPrize.trim()) {
      newErrors.prizes = validationMessages.REQUIRED_PRIZES;
    }

    if (!totalTeams || Number(totalTeams) <= 0) {
      newErrors.totalTeams = validationMessages.INVALID_TEAM_COUNT;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formattedRules = rulesText
    .split(',')
    .map((rule) => rule.trim())
    .filter((rule) => rule.length > 0)
    .map((rule) => rule.charAt(0).toUpperCase() + rule.slice(1));

  const onSubmit = () => {
    if (!validate()) return;

    const updatedEvent: Event = {
      id: event?.id ?? Date.now().toString(),
      name,
      sport,
      format,
      date,
      time,
      venue,
      totalTeams: Number(totalTeams),

      status: event?.status ?? 'OPEN',
      registeredTeams: event?.registeredTeams ?? 0,
      registrationDeadline: event?.registrationDeadline ?? '',

      teamsCreated: event?.teamsCreated ?? false,
      fixturesCreated: event?.fixturesCreated ?? false,

      teams: event?.teams ?? [],
      fixtures: event?.fixtures ?? [],
      registrations: event?.registrations ?? [],
      description,
      rules: formattedRules,
      prizes: [firstPrize, secondPrize, thirdPrize],
    };

    if (isEdit) {
      updateEvent(updatedEvent);
    } else {
      createEvent(updatedEvent);
    }

    navigation.goBack();
  };

  const onBack = () => {
    navigation.goBack();
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
    description,
    rulesText,
    firstPrize,
    secondPrize,
    thirdPrize,

    setName,
    setSport,
    setFormat,
    setDate,
    setTime,
    setVenue,
    setTotalTeams,
    setDescription,
    setRulesText,
    setFirstPrize,
    setSecondPrize,
    setThirdPrize,

    openDatePicker,
    openTimePicker,
    showDatePicker,
    showTimePicker,
    pickerDate,
    onDateChange,
    onTimeChange,

    errors,
    onSubmit,
    onBack,
  };
};
