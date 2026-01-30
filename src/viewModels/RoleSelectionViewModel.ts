import { useState } from 'react';
import { useAuthStore } from '../store/AuthStore';
import { StoredUser } from '../utils/authStorage';
import { RoleType } from '../constants/roles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Params = {
  name: string;
  email: string;
  password: string;
};

export const useRoleSelectionViewModel = (
  navigation: NativeStackNavigationProp<RootStackParamList>,
  params: Params,
) => {
  const { register } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const selectedRoleTitle = selectedRole ?? '...';

  const handleContinue = async () => {
    if (!selectedRole) return;

    const newUser: StoredUser = {
      name: params.name,
      email: params.email,
      password: params.password,
      role: selectedRole,
    };

    await register(newUser);

    switch (selectedRole) {
      case 'admin':
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminTabs' }],
        });
        break;

      case 'organizer':
        navigation.reset({
          index: 0,
          routes: [{ name: 'OrganizerTabs' }],
        });
        break;

      case 'participant':
        navigation.reset({
          index: 0,
          routes: [{ name: 'ParticipantTabs' }],
        });
        break;
    }
  };

  return {
    selectedRole,
    setSelectedRole,
    selectedRoleTitle,
    handleContinue,
  };
};
