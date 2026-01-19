import React, { useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { Lock, Mail, Trophy } from 'lucide-react-native';
import { useLoginViewModel } from '../viewModels/LoginViewModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

const LoginScreen = () => {
  const { email, password, emailError, setEmail, setPassword, onLogin, validateEmail, isFormValid } =
    useLoginViewModel();

  type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    const isValid = onLogin();

    if (!isValid) {
      return;
    }
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
            <Text style={styles.headingSubText}>Manage your events</Text>
          </View>
        </View>

        <View style={styles.entryContainer}>
          <Text style={styles.cardHeadingText}>Welcome Back</Text>
          <Text style={styles.cardHeadingSubText}>
            Sign in to continue to your account
          </Text>

          <Text style={styles.inputLabels}>Email</Text>
          <AppInput
            icon={<Mail size={20} color={colors.textSecondary} />}
            placeholder="Enter your email"
            value={email}
            onBlur={validateEmail}
            onChangeText={setEmail}
          />

          {emailError ? (
            <Text style={styles.errorText}>
                {emailError}
            </Text>
            ) : null}

          <Text style={styles.inputLabels}>Password</Text>
          <AppInput
            icon={<Lock size={20} color={colors.textSecondary} />}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <AppButton title="Sign In" onPress={handleLogin} disabled={!isFormValid}/>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerButtonText}>Sign up</Text>
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
    marginTop: 30,
    padding: 20,
  },
  entryContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 35,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
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
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'right',
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

export default LoginScreen;
