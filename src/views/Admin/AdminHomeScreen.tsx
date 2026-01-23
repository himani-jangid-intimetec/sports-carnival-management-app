import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { APP_STRINGS } from '../../constants/appStrings';
import { styles } from './AdminHomeScreenStyles';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Settings,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import ActionCard from '../../components/ActionsCard/ActionCard';
import LiveMatchesCard from '../../components/MatchesCard/LiveMatchesCard';

const AdminHomeScreen = () => {
  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.container}>
        <Text style={styles.greeting}>{APP_STRINGS.adminScreens.greeting}</Text>

        <View style={styles.analyticsGrid}>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Calendar size={24} color={colors.primary} />}
              title={APP_STRINGS.adminScreens.totalEvents}
              data={24}
            />
            <AnalyticsCard
              icon={<Users size={24} color={colors.usersIconBackground} />}
              title={APP_STRINGS.adminScreens.activeUsers}
              data={156}
            />
          </View>
          <View style={styles.row}>
            <AnalyticsCard
              icon={<Trophy size={24} color={colors.participantBackgroud} />}
              title={APP_STRINGS.adminScreens.team}
              data={48}
            />
            <AnalyticsCard
              icon={
                <TrendingUp size={24} color={colors.matchesIconBackgound} />
              }
              title={APP_STRINGS.adminScreens.matchesToday}
              data={8}
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
                title={APP_STRINGS.adminScreens.addEvent}
              />
            </View>
            <View style={styles.actionCardWrapper}>
              <ActionCard
                icon={<UserPlus size={20} color={colors.usersIconBackground} />}
                title={APP_STRINGS.adminScreens.addUser}
              />
            </View>
            <View style={styles.actionCardWrapper}>
              <ActionCard
                icon={<Settings size={20} color={colors.textSecondary} />}
                title={APP_STRINGS.adminScreens.settings}
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
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AdminHomeScreen;
