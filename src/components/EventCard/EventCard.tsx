import { Text, TouchableOpacity, View } from 'react-native';
import { Event } from '../../models/Event';
import { styles } from './EventCardStyles';
import { colors } from '../../theme/colors';
import { Calendar, MapPin } from 'lucide-react-native';
import { RoleType } from '../../constants/Roles';
import { useState } from 'react';

type EventCardProps = {
  event: Event;
  role: RoleType;
  onPress: () => void;
};

const EventCard = ({ event, onPress }: EventCardProps) => {
  const [pressed, setPressed] = useState(false);

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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
