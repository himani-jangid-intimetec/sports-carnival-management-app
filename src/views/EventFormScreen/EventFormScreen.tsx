import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import { styles } from './EventFormScreenStyles';
import { APP_STRINGS } from '../../constants/appStrings';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useEventFormViewModel } from '../../viewModels/EventFormViewModel';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type EventFormScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EventForm'
>;

const EventFormScreen = ({ route, navigation }: EventFormScreenProps) => {
  const { mode, event } = route.params;

  const viewModel = useEventFormViewModel({
    mode,
    event,
    navigation,
  });

  return (
    <ScreenWrapper scrollable withBottomSafeArea>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable style={styles.iconContainer} onPress={viewModel.onBack}>
            <ArrowLeft size={25} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.heading}>
            {viewModel.isEdit
              ? APP_STRINGS.eventScreen.editEvent
              : APP_STRINGS.eventScreen.createEvent}
          </Text>
        </View>

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
              onChangeText={viewModel.onSportChange}
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
              onChangeText={(view) =>
                viewModel.setFormat(view as '1v1' | '2v2')
              }
              error={viewModel.errors.format}
              editable={viewModel.sport.toLowerCase() !== 'chess'}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.date}
            </Text>
            <TouchableOpacity onPress={viewModel.showDatePicker}>
              <AppInput
                placeholder={APP_STRINGS.eventScreen.date}
                value={viewModel.date}
                editable={false}
                onChangeText={() => {}}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={viewModel.isDatePickerVisible}
              mode="date"
              onConfirm={viewModel.handleConfirmDate}
              onCancel={viewModel.hideDatePicker}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.eventScreen.time}
            </Text>
            <TouchableOpacity onPress={viewModel.showTimePicker}>
              <AppInput
                placeholder={APP_STRINGS.eventScreen.time}
                value={viewModel.time}
                editable={false}
                onChangeText={() => {}}
              />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={viewModel.isTimePickerVisible}
              mode="time"
              onConfirm={viewModel.handleConfirmTime}
              onCancel={viewModel.hideTimePicker}
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabels}>
            {APP_STRINGS.eventScreen.description}
          </Text>
          <AppInput
            placeholder={APP_STRINGS.eventScreen.description}
            value={viewModel.description}
            onChangeText={viewModel.setDescription}
            error={viewModel.errors.description}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabels}>
            {APP_STRINGS.eventScreen.rulesAndRegulations}
          </Text>
          <AppInput
            placeholder={APP_STRINGS.placeHolders.rules}
            value={viewModel.rulesText}
            onChangeText={viewModel.setRulesText}
            error={viewModel.errors.rules}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabels}>
            {APP_STRINGS.eventScreen.prizeForFirst}
          </Text>
          <AppInput
            placeholder={APP_STRINGS.placeHolders.prizeForFirst}
            value={viewModel.firstPrize}
            onChangeText={viewModel.setFirstPrize}
            error={viewModel.errors.totalTeams}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabels}>
            {APP_STRINGS.eventScreen.prizeForSecond}
          </Text>
          <AppInput
            placeholder={APP_STRINGS.placeHolders.prizeForSecond}
            value={viewModel.secondPrize}
            onChangeText={viewModel.setSecondPrize}
            error={viewModel.errors.totalTeams}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabels}>
            {APP_STRINGS.eventScreen.prizeForThird}
          </Text>
          <AppInput
            placeholder={APP_STRINGS.placeHolders.prizeForThird}
            value={viewModel.thirdPrize}
            onChangeText={viewModel.setThirdPrize}
            error={viewModel.errors.totalTeams}
          />
        </View>

        <AppButton
          title={
            viewModel.isEdit
              ? APP_STRINGS.eventScreen.saveChanges
              : APP_STRINGS.eventScreen.createEvent
          }
          onPress={viewModel.onSubmit}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EventFormScreen;
