import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { useEventStore } from '../store/EventStore';

export const useEventRegistrationViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList, 'EventRegister'>,
) => {
  const { eventId } = route.params;
  const { registerParticipant } = useEventStore();

  const [playerName, setPlayerName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');

  const onBack = () => {
    navigation.goBack();
  };

  const onRegister = () => {
    if (!playerName || !gender) return;

    registerParticipant(eventId, playerName, gender);
    navigation.goBack();
  };

  const isFormValid = playerName.length > 0 && gender !== '';

  return {
    playerName,
    gender,
    setPlayerName,
    setGender,
    onBack,
    onRegister,
    isFormValid,
  };
};
