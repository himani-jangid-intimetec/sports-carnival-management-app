import { Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/AppStrings';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useParticipantHomeViewModel } from '../../viewModels/ParticipantHomeScreenViewModel';

const ParticipantHomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const viewModel = useParticipantHomeViewModel(navigation);

  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>
            {APP_STRINGS.participantScreens.greeting}
          </Text>

          <TouchableOpacity onPress={viewModel.onLogout}>
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
            members={[]}
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

          {viewModel.liveMatches.map((match) => (
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

          {viewModel.upcomingMatches.map((match) => (
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
