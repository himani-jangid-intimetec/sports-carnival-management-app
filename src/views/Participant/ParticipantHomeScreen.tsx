import { Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/AppStrings';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import {
  Calendar,
  Clock,
  LogOut,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
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
            Hello, {viewModel.user?.name ?? 'Participant'}! 👋
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
              data={viewModel.myEventsCount}
            />
            <AnalyticsCard
              icon={<Users size={24} color={colors.usersIconBackground} />}
              title={APP_STRINGS.participantScreens.myTeam}
              data={viewModel.myTeamsCount}
            />
          </View>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Trophy size={24} color={colors.participantBackgroud} />}
              title={APP_STRINGS.participantScreens.matchesPlayed}
              data={viewModel.matchesPlayedCount}
            />
            <AnalyticsCard
              icon={
                <TrendingUp size={24} color={colors.matchesIconBackgound} />
              }
              title={APP_STRINGS.participantScreens.wins}
              data={viewModel.winsCount}
            />
          </View>
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.participantScreens.myTeam}
          </Text>

          {viewModel.myTeams.length > 0 ? (
            viewModel.myTeams.map((teamData) => (
              <MyTeamCard
                key={teamData.team.id}
                logo={
                  <Text style={styles.logoStyle}>
                    {teamData.team.name.substring(0, 2).toUpperCase()}
                  </Text>
                }
                name={teamData.team.name}
                members={teamData.team.players.map((player) => player.name)}
                sport={teamData.sport}
                wins={0}
                losses={0}
                winRate="0%"
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {APP_STRINGS.eventScreen.noTeamsYet}
              </Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.eventScreen.todaysMatches}
          </Text>

          {viewModel.todaysMatches.length > 0 ? (
            viewModel.todaysMatches.map((matchData) => (
              <View key={matchData.fixture.id} style={styles.matchCard}>
                <Text style={styles.matchSport}>{matchData.sport}</Text>
                <View style={styles.matchTeams}>
                  <Text style={styles.matchTeamName}>
                    {matchData.fixture.teamA}
                  </Text>
                  <Text style={styles.vsText}>vs</Text>
                  <Text style={styles.matchTeamName}>
                    {matchData.fixture.teamB}
                  </Text>
                </View>
                <View style={styles.matchInfo}>
                  <Clock size={14} color={colors.textSecondary} />
                  <Text style={styles.matchInfoText}>
                    {matchData.fixture.status}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {APP_STRINGS.eventScreen.noMatchesToday}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ParticipantHomeScreen;
