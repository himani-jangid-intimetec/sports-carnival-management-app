import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Lock, Mail, Trophy, User } from 'lucide-react-native';
import { useRegisterViewModel } from '../viewModels/RegisterViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../components/AppInput/AppInput';
import AppButton from '../components/AppButton/AppButton';
import { VALIDATION_MESSAGES } from '../constants/validationMessages';

const RegisterScreen = () => {
  const {
    name,
    email,
    password,
    error,
    setName,
    setEmail,
    setPassword,
    onRegister,
    isFormValid,
    validateName,
    validateEmail,
    validatePassword,
    emailError,
    nameError,
    passwordError,
  } = useRegisterViewModel();

  type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const handleRegister = () => {
    const isValid = onRegister();

    if (!isValid && error) {
      Alert.alert(VALIDATION_MESSAGES.LOGIN_ERROR, error);
      return;
    }

    navigation.navigate('RoleSelection');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.trophyContainer}>
            <Trophy size={40} />
          </View>
          <View>
            <Text style={styles.headingText}>SportsCarnival</Text>
            <Text style={styles.headingSubText}>Join the competition</Text>
          </View>
        </View>

        <View style={styles.entryContainer}>
          <Text style={styles.cardHeadingText}>Create Account</Text>
          <Text style={styles.cardHeadingSubText}>
            Get started with your sports journey
          </Text>

          <View>
            <Text style={styles.inputLabels}>Full Name</Text>
            <AppInput
              icon={<User size={20} color={colors.textSecondary} />}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              onBlur={validateName}
              error={nameError}
            />
          </View>

          <View>
            <Text style={styles.inputLabels}>Email</Text>
            <AppInput
              icon={<Mail size={20} color={colors.textSecondary} />}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
              error={emailError}
            />
          </View>

          <View>
            <Text style={styles.inputLabels}>Password</Text>
            <AppInput
              icon={<Lock size={20} color={colors.textSecondary} />}
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onBlur={validatePassword}
              error={passwordError}
            />
          </View>

          <AppButton
            onPress={handleRegister}
            title="Create Account"
            disabled={!isFormValid}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerButtonText}>Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cardHeadingSubText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  cardHeadingText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 20,
    padding: 20,
  },
  entryContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  footerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  headingSubText: {
    color: colors.textSecondary,
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 16,
    marginTop: 3,
  },
  headingText: {
    color: colors.textPrimary,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 35,
    fontWeight: 'bold',
  },
  inputLabels: {
    color: colors.textPrimary,
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 18,
    marginTop: 20,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
});

export default RegisterScreen;
