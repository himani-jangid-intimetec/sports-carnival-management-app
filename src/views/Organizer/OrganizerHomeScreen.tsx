import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/AppStrings';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import {
  Calendar,
  ClipboardList,
  Clock,
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

const OrganizerHomeScreen = () => {
  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.tagline}>
          {APP_STRINGS.organizerScreens.heading}
        </Text>
        <Text style={styles.greeting}>
          {APP_STRINGS.organizerScreens.greeting}
        </Text>

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

export default OrganizerHomeScreen;
