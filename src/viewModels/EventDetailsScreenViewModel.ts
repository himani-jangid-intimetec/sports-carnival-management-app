import { useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { FormatType, GenderType } from '../models/Event';
import { useEventStore } from '../store/EventStore';

type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

type Category = {
  id: string;
  title: string;
  gender: GenderType;
  format: FormatType;
  participantCount: number;
  teamCount: number;
};

export const useEventDetailsViewModel = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<EventDetailsRouteProp>();
  const { eventId, role } = route.params;

  const { events } = useEventStore();

  const event = useMemo(
    () => events.find((event) => event.id === eventId) ?? null,
    [events, eventId],
  );

  const categories: Category[] = useMemo(() => {
    if (!event) return [];

    const cats: Category[] = [];
    const genders: GenderType[] = ['Male', 'Female'];
    const formats: FormatType[] = event.formats ?? ['Singles', 'Doubles'];

    genders.forEach((gender) => {
      formats.forEach((format) => {
        const participants = event.registrations.filter(
          (player) =>
            player.gender === gender && player.formats?.includes(format),
        );

        const teams = event.teams.filter(
          (team) => team.gender === gender && team.format === format,
        );

        if (participants.length > 0) {
          cats.push({
            id: `${gender}-${format}`,
            title: `${gender} ${format}`,
            gender,
            format,
            participantCount: participants.length,
            teamCount: teams.length,
          });
        }
      });
    });

    return cats;
  }, [event]);

  const isAdminOrOrganizer = role === 'admin' || role === 'organizer';
  const canRegister = role === 'participant' && event?.status === 'OPEN';

  const handleCategoryPress = (category: Category) => {
    if (!event) return;

    navigation.navigate('CategoryDetails', {
      eventId: event.id,
      gender: category.gender,
      format: category.format,
      role,
    });
  };

  const handleEditEvent = () => {
    if (!event) return;

    navigation.navigate('EventForm', {
      mode: 'edit',
      event,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    if (!event) return;

    navigation.navigate('EventRegister', { eventId: event.id });
  };

  return {
    event,
    role,
    categories,
    isAdminOrOrganizer,
    canRegister,
    handleCategoryPress,
    handleEditEvent,
    handleBack,
    handleRegister,
  };
};
