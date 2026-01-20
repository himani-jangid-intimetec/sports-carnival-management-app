import { Alert, Text, View } from 'react-native';
import { useForgotPasswordViewModel } from '../../viewModels/ForgotPasswordViewModel';
import { Lock, Mail, Trophy } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import AppButton from '../../components/AppButton/AppButton';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../../components/AppInput/AppInput';
import { VALIDATION_MESSAGES } from '../../constants/validationMessages';
import { styles } from './ForgotPasswordScreenStyles';

const ForgotPasswordScreen = () => {
  const {
    email,
    newPassword,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    setEmail,
    setNewPassword,
    setConfirmPassword,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    onSubmit,
    isFormValid,
  } = useForgotPasswordViewModel();

  const handleSubmit = () => {
    const success = onSubmit();

    if (success) {
      Alert.alert(
        VALIDATION_MESSAGES.PASSWORD_UPDATED,
        VALIDATION_MESSAGES.PASSWORD_UPDATED_DESCRIPTION,
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.trophyContainer}>
            <Trophy size={40} />
          </View>
          <Text style={styles.headingText}>Reset Password</Text>
        </View>

        <Text style={styles.subText}>
          Create a new password for your account
        </Text>

        <Text style={styles.inputLabel}>Email</Text>
        <AppInput
          icon={<Mail size={20} color={colors.textSecondary} />}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          onBlur={validateEmail}
          error={emailError}
        />

        <Text style={styles.inputLabel}>New Password</Text>
        <AppInput
          icon={<Lock size={20} color={colors.textSecondary} />}
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={setNewPassword}
          onBlur={validatePassword}
          secureTextEntry
          error={passwordError}
        />

        <Text style={styles.inputLabel}>Confirm New Password</Text>
        <AppInput
          icon={<Lock size={20} color={colors.textSecondary} />}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={validateConfirmPassword}
          secureTextEntry
          error={confirmPasswordError}
        />

        <AppButton
          title="Update Password"
          onPress={handleSubmit}
          disabled={!isFormValid}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ForgotPasswordScreen;
