import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Trophy } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { roles, RoleType } from '../../constants/Roles';
import { roleIcons } from '../../utils/roleIcons';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import RoleCard from '../../components/RoleCard/RoleCard';
import AppButton from '../../components/AppButton/AppButton';
import { styles } from './RoleSelectionScreenStyles';
import { APP_STRINGS } from '../../constants/AppStrings';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useRoleSelectionViewModel } from '../../viewModels/RoleSelectionViewModel';

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

  const { name, email, password } = route.params;

  const { selectedRole, setSelectedRole, selectedRoleTitle, handleContinue } =
    useRoleSelectionViewModel(navigation, {
      name,
      email,
      password,
    });

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
