import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { RoleType } from '../../constants/roles';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import EventCard from '../../components/EventCard/EventCard';
import { styles } from './EventsListScreenStyles';
import EventStatusTabs from '../../components/EventStatusTabs/EventStatusTabs';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Event } from '../../models/Event';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import AppButton from '../../components/AppButton/AppButton';
import { APP_STRINGS } from '../../constants/appStrings';
import { useEventStore } from '../../store/EventStore';

type EventListScreenProps = {
  role: RoleType;
};

const EventsListScreen = ({ role }: EventListScreenProps) => {
  const getHeaderTitle = () => {
    switch (role) {
      case 'admin':
        return APP_STRINGS.eventScreen.allEvents;
      case 'organizer':
        return APP_STRINGS.eventScreen.myEvents;
      case 'participant':
        return APP_STRINGS.eventScreen.allEvents;
    }
  };

  const { events, deleteEvent } = useEventStore();

  const [activeTab, setActiveTab] = useState('ALL');

  const filteredEvents = useMemo(() => {
    if (activeTab === 'ALL') return events;
    return events.filter((event) => event.status === activeTab);
  }, [activeTab, events]);

  const tabBarHeight = useBottomTabBarHeight();

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  const onEventPress = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={
              role === 'participant'
                ? styles.headingParticipant
                : styles.heading
            }
          >
            {getHeaderTitle()}
          </Text>

          {role === 'admin' || role === 'organizer' ? (
            <AppButton
              title={APP_STRINGS.eventScreen.creatEvent}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('EventForm', {
                  mode: 'create',
                });
              }}
            />
          ) : null}
        </View>

        <EventStatusTabs activeTab={activeTab} onChange={setActiveTab} />

        {filteredEvents.length === 0 ? (
          <Text style={styles.noEventStyle}>
            {APP_STRINGS.eventScreen.noEventFound}
          </Text>
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                role={role}
                onPress={() => onEventPress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: tabBarHeight + 65,
            }}
          />
        )}

        <EventDetailsModal
          visible={showModal}
          event={selectedEvent}
          role={role}
          onClose={() => setShowModal(false)}
          onEdit={() => {
            setShowModal(false);
            navigation.navigate('EventForm', {
              mode: 'edit',
              event: selectedEvent!,
            });
          }}
          onDelete={() => {
            setShowModal(false);
            deleteEvent(selectedEvent!.id);
          }}
          onRegister={() => {
            setShowModal(false);
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EventsListScreen;
