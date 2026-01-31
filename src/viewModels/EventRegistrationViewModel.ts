import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useEventStore } from '../store/EventStore';

type RegisterRouteProp = RouteProp<RootStackParamList, 'EventRegister'>;

export const useEventRegistrationViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RegisterRouteProp,
) => {
  const { registerParticipant } = useEventStore();
  const { eventId } = route.params;

  const [playerName, setPlayerName] = useState('');
  const [format, setFormat] = useState<'1v1' | '2v2' | ''>('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');

  const onBack = () => {
    navigation.goBack();
  };

  const onRegister = () => {
    if (!playerName || !format || !gender) return;

    registerParticipant(eventId, playerName, gender);

    navigation.goBack();
  };

  const isFormValid = playerName.length > 0 && format !== '' && gender !== '';

  return {
    playerName,
    format,
    gender,
    setPlayerName,
    setFormat,
    setGender,
    onBack,
    onRegister,
    isFormValid,
  };
};
