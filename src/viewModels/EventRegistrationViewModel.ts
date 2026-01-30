import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export const useEventRegistrationViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  const [playerName, setPlayerName] = useState('');
  const [format, setFormat] = useState<'1v1' | '2v2' | ''>('');
  const [gender, setGender] = useState<'Male' | 'Female' | ''>('');

  const onBack = () => {
    navigation.goBack();
  };

  const onRegister = () => {
    if (!playerName || !format || !gender) return;
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
