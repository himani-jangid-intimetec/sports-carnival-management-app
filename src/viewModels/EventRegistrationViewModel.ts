import { useState, useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { useEventStore } from '../store/EventStore';
import { FormatType } from '../models/Event';

export const useEventRegistrationViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList, 'EventRegister'>,
) => {
  const { eventId } = route.params;
  const { events, registerParticipant } = useEventStore();

  const event = useMemo(
    () => events.find((event) => event.id === eventId),
    [events, eventId],
  );

  const [playerName, setPlayerName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
  const [selectedFormats, setSelectedFormats] = useState<FormatType[]>([]);

  const availableFormats: FormatType[] = event?.formats ?? [
    'Singles',
    'Doubles',
  ];

  const toggleFormat = (format: FormatType) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((fixture) => fixture !== format)
        : [...prev, format],
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onRegister = () => {
    if (!playerName || !gender || selectedFormats.length === 0) return;

    registerParticipant(eventId, playerName, gender, selectedFormats);
    navigation.goBack();
  };

  const isFormValid =
    playerName.length > 0 && gender !== '' && selectedFormats.length > 0;

  return {
    playerName,
    gender,
    selectedFormats,
    availableFormats,
    setPlayerName,
    setGender,
    toggleFormat,
    onBack,
    onRegister,
    isFormValid,
  };
};
