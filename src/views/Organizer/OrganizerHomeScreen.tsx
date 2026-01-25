import { Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/appStrings';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import {
  Calendar,
  ClipboardList,
  Clock,
  LogOut,
  MapPin,
  Plus,
  Trophy,
  Users,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import ActionCard from '../../components/ActionsCard/ActionCard';
import LiveMatchesCard from '../../components/MatchesCard/LiveMatchesCard';
import { styles } from './OrganizerHomeScreenStyles';
import UpcomingMatchesCard from '../../components/MatchesCard/UpcomingMatchesCard';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { MOCK_MATCHES, UPCOMING_MATCHES } from '../../constants/mockMatches';

const OrganizerHomeScreen = () => {
  const { logout } = useAuthStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = async () => {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth', params: { screen: 'Login' } }],
    });
  };
  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>
            {APP_STRINGS.organizerScreens.greeting}
          </Text>

          <TouchableOpacity onPress={handleLogout}>
            <LogOut size={22} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.analyticsGrid}>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Calendar size={24} color={colors.primary} />}
              title={APP_STRINGS.organizerScreens.myEvents}
              data={5}
            />
            <AnalyticsCard
              icon={
                <ClipboardList size={24} color={colors.matchesIconBackgound} />
              }
              title={APP_STRINGS.organizerScreens.pendingApprovals}
              data={12}
            />
          </View>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Users size={24} color={colors.usersIconBackground} />}
              title={APP_STRINGS.organizerScreens.teamsRegistered}
              data={32}
            />
            <AnalyticsCard
              icon={<Trophy size={24} color={colors.participantBackgroud} />}
              title={APP_STRINGS.organizerScreens.liveMatches}
              data={2}
            />
          </View>
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.adminScreens.quickActions}
          </Text>

          <View style={styles.actionCardContainer}>
            <View style={styles.actionCardWrapper}>
              <ActionCard
                icon={<Plus size={20} color={colors.primary} />}
                title={APP_STRINGS.organizerScreens.createEvent}
              />
            </View>
            <View style={styles.actionCardWrapper}>
              <ActionCard
                icon={
                  <ClipboardList
                    size={20}
                    color={colors.matchesIconBackgound}
                  />
                }
                title={APP_STRINGS.organizerScreens.reviewTeams}
              />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.eventScreen.todaysMatches}
          </Text>
          {MOCK_MATCHES.map((match) => (
            <LiveMatchesCard
              key={match.id}
              gameName={match.gameName}
              firstTeam={match.firstTeam}
              secondTeam={match.secondTeam}
              status={match.status}
              firstTeamPoints={match.firstTeamPoints}
              secondTeamPoints={match.secondTeamPoints}
              venue={match.venue}
              venueIcon={<MapPin color={colors.textSecondary} />}
              statusIcon={<Clock color={colors.textSecondary} />}
              firstTeamLogo={
                <View>
                  <Text>
                    {match.firstTeam[0]}
                    {match.firstTeam[1].toUpperCase()}
                  </Text>
                </View>
              }
              secondTeamLogo={
                <View>
                  <Text>
                    {match.secondTeam[0]}
                    {match.secondTeam[1].toUpperCase()}
                  </Text>
                </View>
              }
            />
          ))}
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.organizerScreens.upcomingMatches}
          </Text>

          {UPCOMING_MATCHES.map((match) => (
            <UpcomingMatchesCard
              key={match.title}
              {...match}
              sportIcon={<Trophy size={64} color={colors.textSecondary} />}
            />
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default OrganizerHomeScreen;
