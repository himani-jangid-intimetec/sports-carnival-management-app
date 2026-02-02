import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { RoleType } from '../../constants/Roles';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import EventCard from '../../components/EventCard/EventCard';
import { styles } from './EventsListScreenStyles';
import EventStatusTabs from '../../components/EventStatusTabs/EventStatusTabs';
import EventDetailsModal from '../../components/EventDetailsModal/EventDetailsModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import AppButton from '../../components/AppButton/AppButton';
import { APP_STRINGS } from '../../constants/AppStrings';
import { useEventsListViewModel } from '../../viewModels/EventListScreenViewModel';

type EventListScreenProps = {
  role: RoleType;
};

const EventsListScreen = ({ role }: EventListScreenProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const viewModel = useEventsListViewModel(navigation);

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
            {APP_STRINGS.eventScreen.allEvents}
          </Text>

          {(role === 'admin' || role === 'organizer') && (
            <AppButton
              title={APP_STRINGS.eventScreen.createEvent}
              onPress={viewModel.onCreateEvent}
            />
          )}
        </View>

        <EventStatusTabs
          activeTab={viewModel.activeTab}
          onChange={viewModel.setActiveTab}
        />

        {viewModel.filteredEvents.length === 0 ? (
          <Text style={styles.noEventStyle}>
            {APP_STRINGS.eventScreen.noEventFound}
          </Text>
        ) : (
          <FlatList
            data={viewModel.filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                role={role}
                onPress={() => viewModel.onEventPress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: viewModel.tabBarHeight + 65,
            }}
          />
        )}

        <EventDetailsModal
          getRoundName={viewModel.getRoundName}
          visible={viewModel.showModal}
          eventId={viewModel.selectedEventId}
          role={role}
          onClose={viewModel.onCloseModal}
          onEdit={viewModel.onEditEvent}
          onDelete={viewModel.onDeleteEvent}
          onCreateTeams={viewModel.handleCreateTeams}
          onCreateFixtures={viewModel.handleCreateFixtures}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EventsListScreen;
