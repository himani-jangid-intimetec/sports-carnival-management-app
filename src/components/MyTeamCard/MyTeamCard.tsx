import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './MyTeamCardStyles';
import { Trophy, Medal } from 'lucide-react-native';
import { colors } from '../../theme/colors';

type MyTeamCardProps = {
  logo: React.ReactNode;
  name: string;
  members: string[];
  sport: string;
  wins: number;
  losses: number;
  winRate: string;
};

const MyTeamCard = ({
  logo,
  name,
  members,
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
          <View style={styles.headerRow}>
            <Text style={styles.teamName}>{name}</Text>

            <View style={styles.sportBadge}>
              <Text style={styles.sportText}>{sport}</Text>
            </View>
          </View>

          {members.map((member, index) => (
            <Text key={index} style={styles.memberText}>
              • {member}
            </Text>
          ))}
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
