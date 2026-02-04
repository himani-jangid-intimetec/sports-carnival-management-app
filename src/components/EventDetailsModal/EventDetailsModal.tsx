import React, { useState, useMemo } from 'react';
import { Modal, Text, View, Pressable, FlatList } from 'react-native';
import { RoleType } from '../../constants/Roles';
import AppButton from '../AppButton/AppButton';
import { styles } from './EventDetailsModalStyles';
import { APP_STRINGS } from '../../constants/AppStrings';
import { Calendar, MapPin, User, Users, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import MyTeamCard from '../MyTeamCard/MyTeamCard';
import LiveMatchesCard from '../MatchesCard/LiveMatchesCard';
import { useEventStore } from '../../store/EventStore';
import { Event } from '../../models/Event';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = {
  visible: boolean;
  eventId: string | null;
  role: RoleType;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCreateTeams?: () => void;
  onCreateFixtures?: () => void;
  getRoundName: (round: number, totalTeams: number) => string;
};

const TABS = ['ABOUT', 'TEAMS', 'SCHEDULES', 'PRIZES'] as const;
type TabType = (typeof TABS)[number];

const EventDetailsModal = ({
  visible,
  eventId,
  role,
  onClose,
  onEdit,
  onDelete,
  onCreateTeams,
  onCreateFixtures,
  getRoundName,
}: Props) => {
  const { events } = useEventStore();
  const [activeTab, setActiveTab] = useState<TabType>('ABOUT');

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const event: Event | null = useMemo(
    () => events.find((event) => event.id === eventId) ?? null,
    [events, eventId],
  );

  if (!event) return null;

  const isAdmin = role === 'admin';
  const isOrganizer = role === 'organizer';
  const isAdminOrOrganizer = isAdmin || isOrganizer;

  const has2v2Format = event.formats?.includes('Doubles');
  const playersPerTeam = has2v2Format ? 2 : 1;
  const maxRegistrations = event.totalTeams * playersPerTeam;

  const disableCreateTeamsButton =
    isOrganizer && event.registrations.length < maxRegistrations;

  const canRegister =
    role === 'participant' &&
    event.status === 'OPEN' &&
    event.registrations.length < maxRegistrations;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={[styles.statusText, styles[`status_${event.status}`]]}>
              {event.status}
            </Text>
            <Pressable onPress={onClose}>
              <X size={20} color={colors.textSecondary} />
            </Pressable>
          </View>

          <Text style={styles.title}>{event.name}</Text>

          <View style={styles.tabRow}>
            {TABS.map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.content}>
            {activeTab === 'ABOUT' && (
              <View>
                <Text style={styles.sectionTitle}>
                  {APP_STRINGS.eventScreen.format}
                </Text>
                <Text style={styles.text}>
                  {event.formats?.join(', ') ?? 'N/A'}
                </Text>

                <Text style={styles.sectionTitle}>
                  {APP_STRINGS.eventScreen.description}
                </Text>
                <Text style={styles.text}>
                  {event.description ?? APP_STRINGS.eventScreen.noDescription}
                </Text>

                <Text style={styles.sectionTitle}>
                  {APP_STRINGS.eventScreen.rulesAndRegulations}
                </Text>
                {event.rules?.length ? (
                  event.rules.map((rule, index) => (
                    <Text key={index} style={styles.text}>
                      {index + 1}. {rule}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.text}>
                    {APP_STRINGS.eventScreen.standardRules}
                  </Text>
                )}
              </View>
            )}

            {activeTab === 'TEAMS' && (
              <>
                {!has2v2Format ? (
                  <Text style={styles.emptyText}>
                    {APP_STRINGS.eventScreen.noTeamsRequired}
                  </Text>
                ) : event.teams.length ? (
                  <FlatList
                    data={event.teams}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <MyTeamCard
                        logo={<Users color={colors.appBackground} />}
                        name={item.name}
                        members={item.players.map((player) => player.name)}
                        sport={event.sport}
                        wins={0}
                        losses={0}
                        winRate="0%"
                      />
                    )}
                  />
                ) : (
                  <>
                    {isAdminOrOrganizer &&
                      !event.teamsCreated &&
                      event.status !== 'COMPLETED' &&
                      onCreateTeams && (
                        <View style={styles.centerButton}>
                          <AppButton
                            title={APP_STRINGS.eventScreen.createTeam}
                            onPress={onCreateTeams}
                            disabled={disableCreateTeamsButton}
                          />
                        </View>
                      )}

                    {!isAdminOrOrganizer && (
                      <Text style={styles.emptyText}>
                        {APP_STRINGS.eventScreen.teamNotCreated}
                      </Text>
                    )}
                  </>
                )}
              </>
            )}

            {activeTab === 'SCHEDULES' && (
              <>
                {event.fixtures.length ? (
                  <FlatList
                    data={event.fixtures}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <LiveMatchesCard
                        gameName={getRoundName(item.round, event.totalTeams)}
                        firstTeam={item.teamA}
                        secondTeam={item.teamB}
                        firstTeamPoints={item.scoreA}
                        secondTeamPoints={item.scoreB}
                        status={item.status}
                        firstTeamLogo={<User color={colors.appBackground} />}
                        secondTeamLogo={<User color={colors.appBackground} />}
                        venue={event.venue}
                        statusIcon={
                          <Calendar size={16} color={colors.textSecondary} />
                        }
                        venueIcon={
                          <MapPin size={16} color={colors.textSecondary} />
                        }
                      />
                    )}
                  />
                ) : (
                  <>
                    {isAdminOrOrganizer &&
                      !event.fixturesCreated &&
                      event.status !== 'COMPLETED' &&
                      onCreateFixtures && (
                        <View style={styles.centerButton}>
                          <AppButton
                            title={APP_STRINGS.eventScreen.createFixtures}
                            onPress={onCreateFixtures}
                            disabled={has2v2Format && !event.teamsCreated}
                          />
                        </View>
                      )}

                    {!isAdminOrOrganizer && (
                      <Text style={styles.emptyText}>
                        {APP_STRINGS.eventScreen.fixtureNotCreated}
                      </Text>
                    )}
                  </>
                )}
              </>
            )}

            {activeTab === 'PRIZES' && (
              <View style={styles.prizeList}>
                {event.prizes.map((prize, index) => {
                  const title =
                    index === 0
                      ? '1st Place'
                      : index === 1
                      ? '2nd Place'
                      : '3rd Place';

                  return (
                    <View key={index} style={styles.prizeCard}>
                      <View style={styles.prizeIcon}>
                        <Text style={styles.prizeEmoji}>
                          {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                        </Text>
                      </View>

                      <View>
                        <Text style={styles.prizeTitle}>{title}</Text>
                        <Text style={styles.prizeValue}>{prize}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          <View style={styles.footer}>
            {role === 'participant' && (
              <AppButton
                title={
                  canRegister
                    ? APP_STRINGS.eventScreen.register
                    : APP_STRINGS.eventScreen.registrationClosed
                }
                disabled={!canRegister}
                onPress={() => {
                  if (!eventId) return;
                  onClose();
                  navigation.navigate('EventRegister', { eventId });
                }}
              />
            )}

            {isAdminOrOrganizer && (
              <View style={styles.row}>
                <View style={styles.buttonContainer}>
                  <AppButton
                    title={APP_STRINGS.eventScreen.edit}
                    onPress={onEdit}
                    disabled={event.status === 'COMPLETED'}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <AppButton
                    title={APP_STRINGS.eventScreen.delete}
                    onPress={onDelete}
                    disabled={event.status === 'COMPLETED'}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EventDetailsModal;
