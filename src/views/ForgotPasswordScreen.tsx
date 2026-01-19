import { Alert, StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { ForgotPasswordViewModel } from '../viewModels/ForgotPasswordViewModel';
import { Lock, Mail, Trophy } from 'lucide-react-native';
import AppInput from '../components/AppInput';
import { colors } from '../theme/colors';
import AppButton from '../components/AppButton';

const ForgotPasswordScreen = () => {
  const {
    email,
    setEmail,
    newPassword,
    confirmPassword,
    isButtonDisabled,
    onSubmit,
    setNewPassword,
    setConfirmPassword,
    validateEmail,
  } = ForgotPasswordViewModel();

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
            <Trophy size={40} color={colors.primaryText} />
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
        />

        <Text style={styles.inputLabel}>New Password</Text>
        <AppInput
          icon={<Lock size={20} color={colors.textSecondary} />}
          placeholder="Enter new password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Text style={styles.inputLabel}>Confirm New Password</Text>
        <AppInput
          icon={<Lock size={20} color={colors.textSecondary} />}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <AppButton
          title="Update Password"
          onPress={handleSubmit}
          disabled={isButtonDisabled}
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
