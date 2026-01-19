import { Alert, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useForgotPasswordViewModel } from '../viewModels/ForgotPasswordViewModel';
import { Lock, Mail, Trophy } from 'lucide-react-native';
import AppInput from '../components/AppInput';
import { colors } from '../theme/colors';
import AppButton from '../components/AppButton';

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
        'Password updated',
        'Your password has been successfully updated.',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 30,
  },
  headingText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputLabel: {
    color: colors.textPrimary,
    fontSize: 18,
    marginTop: 25,
  },
  subText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 20,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
});

export default ForgotPasswordScreen;
