import React from 'react';
import { Text, View, Pressable, FlatList } from 'react-native';
import { ArrowLeft, User, Users } from 'lucide-react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppButton from '../../components/AppButton/AppButton';
import MyTeamCard from '../../components/MyTeamCard/MyTeamCard';
import FixtureManageCard from '../../components/FixtureManageCard/FixtureManageCard';
import { colors } from '../../theme/colors';
import { styles } from './CategoryDetailsScreenStyles';
import { APP_STRINGS } from '../../constants/AppStrings';
import { useCategoryDetailsViewModel } from '../../viewModels/CategoryDetailsScreenViewModel';

export const FIXTURE_TABS = ['ALL', 'LIVE', 'UPCOMING', 'COMPLETED'] as const;

const CategoryDetailsScreen = () => {
  const viewModel = useCategoryDetailsViewModel();

  if (!viewModel.event) {
    return (
      <ScreenWrapper>
        <Text style={styles.errorText}>
          {APP_STRINGS.eventScreen.noEventFound}
        </Text>
      </ScreenWrapper>
    );
  }

  const {
    event,
    gender,
    format,
    navigation,
    mainTabs,
    activeMainTab,
    setActiveMainTab,
    activeFixtureTab,
    setActiveFixtureTab,
    participants,
    teams,
    filteredFixtures,
    isAdminOrOrganizer,
    hasTeamsForGender,
    hasFixturesForGender,
    getRoundName,
    handleCreateTeams,
    handleCreateFixtures,
    handleSetLive,
    handleUpdateScore,
    handleCompleteFixture,
  } = viewModel;

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.headerTitle}>
            {gender} {format}
          </Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.mainTabRow}>
          {mainTabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveMainTab(tab)}
              style={[
                styles.mainTabButton,
                activeMainTab === tab && styles.activeMainTab,
              ]}
            >
              <Text
                style={[
                  styles.mainTabText,
                  activeMainTab === tab && styles.activeMainTabText,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.content}>
          {activeMainTab === 'PARTICIPANTS' && (
            <FlatList
              data={participants}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              renderItem={({ item, index }) => (
                <View style={styles.participantCard}>
                  <View style={styles.participantAvatar}>
                    <User size={20} color={colors.primary} />
                  </View>
                  <View style={styles.participantInfo}>
                    <Text style={styles.participantName}>{item.name}</Text>
                    <Text style={styles.participantIndex}>#{index + 1}</Text>
                  </View>
                </View>
              )}
            />
          )}

          {activeMainTab === 'TEAMS' && (
            <>
              {hasTeamsForGender ? (
                <FlatList
                  data={teams}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContent}
                  renderItem={({ item }) => (
                    <MyTeamCard
                      logo={<Users color={colors.appBackground} />}
                      name={item.name}
                      members={item.players.map((p) => p.name)}
                      sport={event.sport}
                      wins={0}
                      losses={0}
                      winRate="0%"
                    />
                  )}
                />
              ) : (
                <View style={styles.centerButton}>
                  <AppButton
                    title={APP_STRINGS.eventScreen.createTeam}
                    onPress={handleCreateTeams}
                  />
                </View>
              )}
            </>
          )}

          {activeMainTab === 'FIXTURES' && (
            <View style={styles.fixturesContainer}>
              <View style={styles.fixtureTabRow}>
                {FIXTURE_TABS.map((tab) => (
                  <Pressable
                    key={tab}
                    onPress={() => setActiveFixtureTab(tab)}
                    style={[
                      styles.fixtureTabButton,
                      activeFixtureTab === tab && styles.activeFixtureTab,
                    ]}
                  >
                    <Text>{tab}</Text>
                  </Pressable>
                ))}
              </View>

              {hasFixturesForGender ? (
                <FlatList
                  data={filteredFixtures}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContent}
                  renderItem={({ item }) => (
                    <FixtureManageCard
                      fixture={item}
                      roundName={getRoundName(
                        item.round,
                        format === 'Singles'
                          ? participants.length
                          : teams.length,
                      )}
                      isOrganizer={isAdminOrOrganizer}
                      onSetLive={() => handleSetLive(item.id)}
                      onUpdateScore={(a, b) => handleUpdateScore(item.id, a, b)}
                      onComplete={(a, b) =>
                        handleCompleteFixture(item.id, a, b)
                      }
                    />
                  )}
                />
              ) : (
                <View style={styles.centerButton}>
                  <AppButton
                    title={APP_STRINGS.eventScreen.createFixtures}
                    onPress={handleCreateFixtures}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default CategoryDetailsScreen;
