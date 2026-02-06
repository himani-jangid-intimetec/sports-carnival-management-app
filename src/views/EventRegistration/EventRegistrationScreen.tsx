import { View, Text, Pressable } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { ArrowLeft } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { APP_STRINGS } from '../../constants/AppStrings';
import { styles } from './EventRegistrationScreenStyles';
import { useEventRegistrationViewModel } from '../../viewModels/EventRegistrationViewModel';

type EventRegistrationProps = NativeStackScreenProps<
  RootStackParamList,
  'EventRegister'
>;

const EventRegistrationScreen = ({
  navigation,
  route,
}: EventRegistrationProps) => {
  const viewModel = useEventRegistrationViewModel(navigation, route);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={viewModel.onBack}>
            <ArrowLeft size={24} color={colors.textPrimary} />
          </Pressable>
          <Text style={styles.heading}>
            {APP_STRINGS.eventScreen.registerForEvent}
          </Text>
        </View>

        <Text style={styles.label}>{APP_STRINGS.placeHolders.playerName}</Text>
        <AppInput
          placeholder={APP_STRINGS.placeHolders.fullName}
          value={viewModel.playerName}
          onChangeText={viewModel.setPlayerName}
        />

        <Text style={styles.label}>{APP_STRINGS.placeHolders.gender}</Text>
        <View style={styles.formatContainer}>
          {['Male', 'Female'].map((item) => {
            const isActive = viewModel.gender === item;
            return (
              <Pressable
                key={item}
                onPress={() => viewModel.setGender(item as 'Male' | 'Female')}
                style={[styles.formatTab, isActive && styles.activeFormatTab]}
              >
                <Text
                  style={[
                    styles.formatText,
                    isActive && styles.activeFormatText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <AppButton
          title={APP_STRINGS.eventScreen.register}
          onPress={viewModel.onRegister}
          disabled={!viewModel.isFormValid}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EventRegistrationScreen;
