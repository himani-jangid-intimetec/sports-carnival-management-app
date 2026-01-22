import { Text, TouchableOpacity, View } from 'react-native';
import { Event } from '../../models/Event';
import { styles } from './EventCardStyles';
import { colors } from '../../theme/colors';
import { Calendar, MapPin, Users } from 'lucide-react-native';
import { RoleType } from '../../constants/roles';
import { useState } from 'react';

type EventCardProps = {
  event: Event;
  role: RoleType;
  onPress: () => void;
};

const EventCard = ({ event, onPress }: EventCardProps) => {
  const [pressed, setPressed] = useState(false);
  const getProgressColor = () => {
    switch (event.status) {
      case 'LIVE':
        return colors.participantBackgroud;
      case 'COMPLETED':
        return colors.error;
      case 'OPEN':
        return colors.matchesIconBackgound;
      case 'UPCOMING':
        return colors.usersIconBackground;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View style={styles.status}>
          <Text style={styles.sportText}>{event.sport}</Text>
          <Text style={[styles.statusText, styles[`status_${event.status}`]]}>
            {event.status}
          </Text>
        </View>
        <View style={styles.left}>
          <View style={styles.info}>
            <Text style={styles.title}>{event.name}</Text>
            <View style={styles.details}>
              <Calendar color={colors.textSecondary} />
              <Text style={styles.detailsText}>{event.date}</Text>
            </View>
            <View style={styles.details}>
              <MapPin color={colors.textSecondary} />
              <Text style={styles.detailsText}>{event.venue}</Text>
            </View>
          </View>

          <View style={styles.teamRow}>
            <View style={styles.teamDetails}>
              <Users color={colors.primary} />
              <Text style={styles.teamText}>
                {event.registeredTeams} / {event.totalTeams} Teams
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${
                      (event.registeredTeams / event.totalTeams) * 100
                    }%`,
                    backgroundColor: getProgressColor(),
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
