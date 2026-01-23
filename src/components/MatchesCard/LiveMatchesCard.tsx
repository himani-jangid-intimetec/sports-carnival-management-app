import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './LiveMatchesCardStyles';
import { APP_STRINGS } from '../../constants/appStrings';

type LiveMatchesCardProps = {
  gameName: string;
  firstTeam: string;
  secondTeam: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
  status?: string;
  firstTeamLogo: React.ReactNode;
  secondTeamLogo: React.ReactNode;
  venue: string;
  statusIcon: React.ReactNode;
  venueIcon: React.ReactNode;
};

const LiveMatchesCard = ({
  gameName,
  firstTeam,
  secondTeam,
  firstTeamPoints,
  secondTeamPoints,
  status,
  firstTeamLogo,
  secondTeamLogo,
  venue,
  statusIcon,
  venueIcon,
}: LiveMatchesCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        <Text style={styles.gameTitle}>{gameName}</Text>
        <Text
          style={
            status === 'Live'
              ? styles.gameStatusLive
              : styles.gameStatusUpcoming
          }
        >
          {status}
        </Text>
      </View>

      <View style={styles.pointsContainer}>
        <View style={styles.teamContainer}>
          <View style={styles.logoContainer}>{firstTeamLogo}</View>
          <Text style={styles.teamName}>{firstTeam}</Text>
          <Text style={styles.pointsStyle}>{firstTeamPoints}</Text>
        </View>

        <View style={styles.teamContainer}>
          <Text style={styles.textStyle}>{APP_STRINGS.eventScreen.vs}</Text>
          {status === 'Live' ? (
            <Text style={styles.statusStyle}>{status}</Text>
          ) : (
            ''
          )}
        </View>

        <View style={styles.teamContainer}>
          <View style={styles.logoContainer}>{secondTeamLogo}</View>
          <Text style={styles.teamName}>{secondTeam}</Text>
          <Text style={styles.pointsStyle}>{secondTeamPoints}</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          {statusIcon}
          <Text style={styles.footerText}>{status}</Text>
        </View>
        <View style={styles.footer}>
          {venueIcon}
          <Text style={styles.footerText}>{venue}</Text>
        </View>
      </View>
    </View>
  );
};

export default LiveMatchesCard;
