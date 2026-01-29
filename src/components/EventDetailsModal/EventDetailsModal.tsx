import React from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { Calendar, Clock, MapPin, Users, X } from 'lucide-react-native';
import { Event } from '../../models/Event';
import { colors } from '../../theme/colors';
import { styles } from './EventDetailsModalStyles';
import { APP_STRINGS } from '../../constants/appStrings';

type EventDetailsProps = {
  visible: boolean;
  event: Event | null;
  role: 'admin' | 'organizer' | 'participant';
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRegister: () => void;
};

const EventDetailsModal = ({
  visible,
  event,
  role,
  onClose,
  onEdit,
  onDelete,
  onRegister,
}: EventDetailsProps) => {
  if (!event) return null;

  const handleDelete = () => {
    Alert.alert(
      APP_STRINGS.eventScreen.deleteEvent,
      APP_STRINGS.eventScreen.deleteEventConfirmation,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onDelete },
      ],
    );
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={[styles.statusText, styles[`status_${event.status}`]]}>
            {event.status}
          </Text>
          <Pressable onPress={onClose}>
            <X size={28} color={colors.textPrimary} />
          </Pressable>
        </View>

        <Text style={styles.title}>{event.name}</Text>

        <View style={styles.details}>
          <View style={styles.row}>
            <Calendar size={30} color={colors.usersIconBackground} />
            <Text style={styles.meta}>{event.date}</Text>
          </View>
          <View style={styles.row}>
            <Clock size={30} color={colors.participantBackgroud} />
            <Text style={styles.meta}>{event.time}</Text>
          </View>
          <View style={styles.row}>
            <MapPin size={30} color={colors.matchesIconBackgound} />
            <Text style={styles.meta}>{event.venue}</Text>
          </View>
          <View style={styles.row}>
            <Users size={30} color={colors.primary} />
            <Text style={styles.meta}>
              {event.registeredTeams} / {event.totalTeams}
              {APP_STRINGS.eventScreen.teamsRegistered}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          {role === 'participant' && (
            <Pressable style={styles.primaryBtn} onPress={onRegister}>
              <Text style={styles.primaryText}>
                {APP_STRINGS.eventScreen.register}
              </Text>
            </Pressable>
          )}

          {(role === 'admin' || role === 'organizer') && (
            <View style={styles.rowActions}>
              <Pressable style={styles.secondaryBtn} onPress={onEdit}>
                <Text style={styles.secondaryText}>
                  {APP_STRINGS.eventScreen.edit}
                </Text>
              </Pressable>

              <Pressable style={styles.dangerBtn} onPress={handleDelete}>
                <Text style={styles.dangerText}>
                  {APP_STRINGS.eventScreen.delete}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EventDetailsModal;
