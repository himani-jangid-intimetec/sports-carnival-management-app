import { Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/appStrings';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import {
  Calendar,
  Clock,
  LogOut,
  MapPin,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import LiveMatchesCard from '../../components/MatchesCard/LiveMatchesCard';
import UpcomingMatchesCard from '../../components/MatchesCard/UpcomingMatchesCard';
import { styles } from './ParticipantHomeScreenStyles';
import MyTeamCard from '../../components/MyTeamCard/MyTeamCard';
import { useAuthStore } from '../../store/AuthStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { MOCK_MATCHES, UPCOMING_MATCHES } from '../../constants/mockMatches';

const ParticipantHomeScreen = () => {
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
            {APP_STRINGS.participantScreens.greeting}
          </Text>

          <TouchableOpacity onPress={handleLogout}>
            <LogOut size={22} color={colors.error} />
          </TouchableOpacity>
        </View>

        <View style={styles.analyticsGrid}>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Calendar size={24} color={colors.primary} />}
              title={APP_STRINGS.participantScreens.myEvents}
              data={3}
            />
            <AnalyticsCard
              icon={<Users size={24} color={colors.usersIconBackground} />}
              title={APP_STRINGS.participantScreens.myTeam}
              data={1}
            />
          </View>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Trophy size={24} color={colors.participantBackgroud} />}
              title={APP_STRINGS.participantScreens.matchesPlayed}
              data={7}
            />
            <AnalyticsCard
              icon={
                <TrendingUp size={24} color={colors.matchesIconBackgound} />
              }
              title={APP_STRINGS.participantScreens.wins}
              data={5}
            />
          </View>
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.participantScreens.myTeam}
          </Text>

          <MyTeamCard
            logo={<Text style={styles.logoStyle}>TH</Text>}
            name="Thunder Hawks"
            captain="John Doe"
            usersIcon={<Users size={18} color={colors.usersIconBackground} />}
            currentPlayers={11}
            totalPlayers={15}
            sport="Football"
            wins={5}
            losses={2}
            winRate="71%"
          />
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

export default ParticipantHomeScreen;
