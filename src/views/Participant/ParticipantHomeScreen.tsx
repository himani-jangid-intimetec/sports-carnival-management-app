import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/appStrings';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import {
  Calendar,
  Clock,
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

const ParticipantHomeScreen = () => {
  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.greeting}>
          {APP_STRINGS.participantScreens.greeting}
        </Text>

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
            {APP_STRINGS.adminScreens.liveMatches}
          </Text>

          <LiveMatchesCard
            gameName="Football"
            firstTeam="Thunder Hawks"
            secondTeam="Storm Riders"
            status="Live"
            firstTeamPoints={2}
            secondTeamPoints={1}
            venue="Court A"
            venueIcon={<MapPin color={colors.textSecondary} />}
            statusIcon={<Clock color={colors.textSecondary} />}
            firstTeamLogo={
              <View>
                <Text>TH</Text>
              </View>
            }
            secondTeamLogo={
              <View>
                <Text>SR</Text>
              </View>
            }
          />
          <LiveMatchesCard
            gameName="Football"
            firstTeam="Thunder Hawks"
            secondTeam="Storm Riders"
            status="Upcoming"
            firstTeamPoints={2}
            secondTeamPoints={1}
            venue="Court A"
            venueIcon={<MapPin color={colors.textSecondary} />}
            statusIcon={<Clock color={colors.textSecondary} />}
            firstTeamLogo={
              <View>
                <Text>TH</Text>
              </View>
            }
            secondTeamLogo={
              <View>
                <Text>SR</Text>
              </View>
            }
          />
        </View>

        <View>
          <Text style={styles.heading}>
            {APP_STRINGS.organizerScreens.upcomingMatches}
          </Text>

          <UpcomingMatchesCard
            sport="Football"
            title="Inter-College Football Championship"
            date="Jan 20, 2026"
            location="Central Stadium"
            currentTeams={12}
            maxTeams={16}
            status="REGISTRATION_OPEN"
            sportIcon={<Trophy size={64} color={colors.textSecondary} />}
          />

          <UpcomingMatchesCard
            sport="Carrom"
            title="Inter-College Carrom Championship"
            date="Jan 30, 2026"
            location="Central Stadium"
            currentTeams={5}
            maxTeams={10}
            status="LIVE"
            sportIcon={<Trophy size={64} color={colors.textSecondary} />}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ParticipantHomeScreen;
