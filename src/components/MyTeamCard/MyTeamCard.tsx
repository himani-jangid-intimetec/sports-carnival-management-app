import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './MyTeamCardStyles';
import { APP_STRINGS } from '../../constants/AppStrings';
import { Medal, Trophy } from 'lucide-react-native';
import { colors } from '../../theme/colors';

type MyTeamCardProps = {
  logo: React.ReactNode;
  name: string;
  captain: string;
  usersIcon: React.ReactNode;
  currentPlayers: number;
  totalPlayers: number;
  sport: string;
  wins: number;
  losses: number;
  winRate: string;
};

const MyTeamCard = ({
  logo,
  name,
  captain,
  usersIcon,
  currentPlayers,
  totalPlayers,
  sport,
  wins,
  losses,
  winRate,
}: MyTeamCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.logoContainer}>{logo}</View>

        <View style={styles.teamInfo}>
          <Text style={styles.teamName}>{name}</Text>
          <Text style={styles.captainText}>
            {APP_STRINGS.participantScreens.captain}: {captain}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.playerCount}>
              {usersIcon}
              <Text style={styles.playerText}>
                {currentPlayers}/{totalPlayers}
              </Text>
            </View>

            <View style={styles.sportBadge}>
              <Text style={styles.sportText}>{sport}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View style={styles.statsRow}>
          <View style={styles.statsDetails}>
            <Trophy color={colors.participantBackgroud} />
            <Text style={styles.winText}>{wins}W</Text>
          </View>
          <View style={styles.statsDetails}>
            <Medal color={colors.error} />
            <Text style={styles.lossText}>{losses}L</Text>
          </View>
        </View>

        <Text style={styles.winRateText}>{winRate} Win Rate</Text>
      </View>
    </View>
  );
};

export default MyTeamCard;
