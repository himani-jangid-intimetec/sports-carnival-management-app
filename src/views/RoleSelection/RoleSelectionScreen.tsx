import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Trophy } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { roles, RoleType } from '../../constants/roles';
import { roleIcons } from '../../utils/roleIcons';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import RoleCard from '../../components/RoleCard/RoleCard';
import AppButton from '../../components/AppButton/AppButton';
import { styles } from './RoleSelectionScreenStyles';
import { APP_STRINGS } from '../../constants/appStrings';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useAuthStore } from '../../store/AuthStore';
import { StoredUser } from '../../utils/authStorage';

type RouteParams = {
  key: string;
  name: 'RoleSelection';
  params: {
    name: string;
    email: string;
    password: string;
  };
};

const RoleSelectionScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteParams>();
  const { register } = useAuthStore();
  const { name, email, password } = route.params;

  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const selectedRoleTitle =
    roles.find((role) => role.key === selectedRole)?.title ?? '...';

  const handleContinue = async () => {
    if (!selectedRole) return;

    const newUser: StoredUser = {
      name,
      email,
      password,
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

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.trophyContainer}>
            <Trophy size={40} color={colors.appBackground} />
          </View>
          <View>
            <Text style={styles.headingText}>{APP_STRINGS.app.name}</Text>
            <Text style={styles.headingSubText}>
              {APP_STRINGS.roleSelection.chooseRole}
            </Text>
          </View>
        </View>

        <Text style={styles.subHeadingText}>
          {APP_STRINGS.roleSelection.heading}
        </Text>
        <Text style={styles.subHeadingSubText}>
          {APP_STRINGS.roleSelection.subHeading}
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={roles}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            const Icon = roleIcons[item.key as RoleType];

            return (
              <RoleCard
                icon={
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        backgroundColor:
                          item.color === 'primary'
                            ? colors.primary
                            : colors.participantBackgroud,
                      },
                    ]}
                  >
                    <Icon size={26} color={colors.textPrimary} />
                  </View>
                }
                title={item.title}
                description={item.description}
                features={item.features}
                isSelected={selectedRole === item.key}
                onPress={() => setSelectedRole(item.key as RoleType)}
              />
            );
          }}
        />

        <AppButton
          title={`Continue as ${selectedRoleTitle}`}
          disabled={!selectedRole}
          onPress={handleContinue}
        />
      </View>
    </ScreenWrapper>
  );
};

export default RoleSelectionScreen;
