import { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { RoleType } from '../constants/Roles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export const useRoleSelectionViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
) => {
  const { setRole } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const selectedRoleTitle = selectedRole ?? '...';

  const handleContinue = async () => {
    if (!selectedRole) return;

    setRole(selectedRole);

    navigation.replace('Auth', { screen: 'Login' });
  };

  return {
    selectedRole,
    setSelectedRole,
    selectedRoleTitle,
    handleContinue,
  };
};
