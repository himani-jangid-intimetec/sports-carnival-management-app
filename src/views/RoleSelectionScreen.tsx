import React, { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { roles, RoleType } from '../constants/roles';
import { roleIcons } from '../utils/roleIcons';
import RoleCard from '../components/RoleCard';
import AppButton from '../components/AppButton';

const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);

  const selectedRoleTitle =
    roles.find((role) => role.key === selectedRole)?.title ?? '...';

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.trophyContainer}>
            <Trophy size={40} color={colors.background} />
          </View>
          <View>
            <Text style={styles.headingText}>SportsCarnival</Text>
            <Text style={styles.headingSubText}>Choose your role</Text>
          </View>
        </View>

        <Text style={styles.subHeadingText}>How will you participate?</Text>
        <Text style={styles.subHeadingSubText}>
          Select your role to customize your experience. You can change this
          later in the settings.
        </Text>

        <FlatList
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
          onPress={() => {
            if (!selectedRole) return;
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  headingSubText: {
    color: colors.textSecondary,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginTop: 3,
  },
  headingText: {
    color: colors.textPrimary,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 35,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  subHeadingSubText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  subHeadingText: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 25,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
});

export default RoleSelectionScreen;
