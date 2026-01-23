import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { styles } from './EventFormScreenStyles';
import { APP_STRINGS } from '../../constants/appStrings';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { useEventFormViewModel } from '../../viewModels/EventFromViewModel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useEventStore } from '../../store/EventStore';

type EventFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EventForm'
>;

const EventFormScreen = ({ route, navigation }: EventFormScreenProps) => {
  const { mode, event } = route.params;

  const viewModel = useEventFormViewModel({ mode, event });
  const { createEvent, updateEvent } = useEventStore();

  const handleSubmit = () => {
    const updatedEvent = viewModel.submit();

    if (!updatedEvent) return;

    if (mode === 'edit') {
      updateEvent(updatedEvent);
    } else {
      createEvent(updatedEvent);
    }

    navigation.goBack();
  };

  return (
    <ScreenWrapper scrollable withBottomSafeArea>
      <View style={styles.container}>
        <Text style={styles.heading}>
          {viewModel.isEdit
            ? APP_STRINGS.eventScreen.editEvent
            : APP_STRINGS.eventScreen.creatEvent}
        </Text>

        <Text style={styles.inputLabels}>
          {APP_STRINGS.eventScreen.eventName}
        </Text>
        <AppInput
          placeholder={APP_STRINGS.eventScreen.eventName}
          value={viewModel.name}
          onChangeText={viewModel.setName}
          error={viewModel.errors.name}
        />

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.sportName}
            </Text>
            <AppInput
              placeholder={APP_STRINGS.eventScreen.sportName}
              value={viewModel.sport}
              onChangeText={viewModel.setSport}
              error={viewModel.errors.sport}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.format}
            </Text>
            <AppInput
              placeholder={APP_STRINGS.placeHolders.format}
              value={viewModel.format}
              onChangeText={(v) => viewModel.setFormat(v as '1v1' | '2v2')}
              error={viewModel.errors.format}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.date}
            </Text>
            <AppInput
              placeholder={APP_STRINGS.eventScreen.date}
              value={viewModel.date}
              onChangeText={viewModel.setDate}
              error={viewModel.errors.date}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.time}
            </Text>
            <AppInput
              placeholder={APP_STRINGS.eventScreen.time}
              value={viewModel.time}
              onChangeText={viewModel.setTime}
              error={viewModel.errors.time}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.venue}
            </Text>
            <AppInput
              placeholder={APP_STRINGS.eventScreen.venue}
              value={viewModel.venue}
              onChangeText={viewModel.setVenue}
              error={viewModel.errors.venue}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.totalTeams}
            </Text>
            <AppInput
              placeholder={APP_STRINGS.eventScreen.totalTeams}
              value={viewModel.totalTeams}
              onChangeText={viewModel.setTotalTeams}
              keyboardType="number-pad"
              error={viewModel.errors.totalTeams}
            />
          </View>
        </View>

        <AppButton
          title={
            viewModel.isEdit
              ? APP_STRINGS.eventScreen.saveChanges
              : APP_STRINGS.eventScreen.creatEvent
          }
          onPress={handleSubmit}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EventFormScreen;
