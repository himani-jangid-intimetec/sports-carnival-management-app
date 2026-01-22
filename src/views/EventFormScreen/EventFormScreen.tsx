import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { styles } from './EventFormScreenStyles';
import { APP_STRINGS } from '../../constants/AppStrings';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { useEventFormViewModel } from '../../viewModels/EventFromViewModel';

const EventFormScreen = ({ route, navigation }: any) => {
  const { mode, event, onSubmit } = route.params;

  const viewModel = useEventFormViewModel({
    mode,
    event,
    onSubmit: (updatedEvent) => {
      onSubmit(updatedEvent);
    },
  });

  return (
    <ScreenWrapper scrollable withBottomSafeArea>
      <View style={styles.container}>
        <Text style={styles.heading}>
          {viewModel.isEdit ? 'Edit Event' : 'Create Event'}
        </Text>

        <Text style={styles.inputLabels}>
          {APP_STRINGS.eventScreen.eventName}
        </Text>
        <AppInput
          placeholder="Event Name"
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
              placeholder="Sport"
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
              placeholder="Format (1v1 / 2v2)"
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
              placeholder="Date"
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
              placeholder="Time"
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
              placeholder="Venue"
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
              placeholder="Total Teams"
              value={viewModel.totalTeams}
              onChangeText={viewModel.setTotalTeams}
              keyboardType="number-pad"
              error={viewModel.errors.totalTeams}
            />
          </View>
        </View>

        <AppButton
          title={viewModel.isEdit ? 'Save Changes' : 'Create Event'}
          onPress={() => {
            const success = viewModel.submit();
            if (success) {
              navigation.goBack();
            }
          }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EventFormScreen;
