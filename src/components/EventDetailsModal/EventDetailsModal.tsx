import React from 'react';
import { Alert, Modal, Pressable, Text, View } from 'react-native';
import { Event } from '../../models/Event';
import { X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { styles } from './EventDetailsModalStyles';
import { APP_STRINGS } from '../../constants/AppStrings';

type Props = {
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
}: Props) => {
  if (!event) return null;

  const handleDelete = () => {
    Alert.alert(
      APP_STRINGS.eventScreen.deleteEvent,
      APP_STRINGS.eventScreen.deleteEventConfirmation,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDelete();
            onClose();
          },
        },
      ],
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.sheet}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.name}</Text>

          <Pressable onPress={onClose} hitSlop={10}>
            <X size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        <Text style={styles.meta}>
          {event.sport} • {event.format}
        </Text>
        <Text style={styles.meta}>
          {event.date} • {event.time}
        </Text>
        <Text style={styles.meta}>{event.venue}</Text>

        <View style={styles.actions}>
          {role === 'participant' && (
            <Pressable style={styles.primaryBtn} onPress={onRegister}>
              <Text style={styles.primaryText}>Register</Text>
            </Pressable>
          )}

          {(role === 'admin' || role === 'organizer') && (
            <>
              <Pressable style={styles.secondaryBtn} onPress={onEdit}>
                <Text style={styles.editText}>Edit Event</Text>
              </Pressable>

              <Pressable style={styles.dangerBtn} onPress={handleDelete}>
                <Text style={styles.dangerText}>Delete Event</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EventDetailsModal;
