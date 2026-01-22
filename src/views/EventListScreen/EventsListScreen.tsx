import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { RoleType } from '../../constants/roles';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { MOCK_EVENTS } from '../../constants/mockEvents';
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

type EventListScreenProps = {
  role: RoleType;
};

const EventsListScreen = ({ role }: EventListScreenProps) => {
  const getHeaderTitle = () => {
    switch (role) {
      case 'admin':
        return 'All Events';
      case 'organizer':
        return 'My Events';
      case 'participant':
        return 'All Events';
    }
  };

  const [activeTab, setActiveTab] = useState('ALL');

  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

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

  const onEditEvent = (updatedEvent: Event) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  const onCreateEvent = (newEvent: Event) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const onDeleteEvent = (name: string) => {
    setEvents((prev) => prev.filter((e) => e.name !== name));
  };

  return (
    <ScreenWrapper scrollable={false}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>{getHeaderTitle()}</Text>

          {role === 'admin' || role === 'organizer' ? (
            <AppButton
              title="Create Event"
              onPress={() => {
                setShowModal(false);
                navigation.navigate('EventForm', {
                  mode: 'create',
                  onSubmit: onCreateEvent,
                });
              }}
            />
          ) : null}
        </View>

        <EventStatusTabs activeTab={activeTab} onChange={setActiveTab} />

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
              onSubmit: onEditEvent,
            });
          }}
          onDelete={() => {
            setShowModal(false);
            onDeleteEvent(selectedEvent!.name);
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
