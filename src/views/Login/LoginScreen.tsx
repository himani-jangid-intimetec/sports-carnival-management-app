import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Lock, Mail, Trophy } from 'lucide-react-native';
import { useLoginViewModel } from '../../viewModels/LoginViewModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { styles } from './LoginScreenStyles';

const LoginScreen = () => {
  const {
    email,
    password,
    emailError,
    setEmail,
    setPassword,
    onLogin,
    validateEmail,
    isFormValid,
    passwordError,
    validatePassword,
  } = useLoginViewModel();

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
            error={emailError}
          />

          <Text style={styles.inputLabels}>Password</Text>
          <AppInput
            icon={<Lock size={20} color={colors.textSecondary} />}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={passwordError}
            onBlur={validatePassword}
          />

          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <AppButton
            title="Sign In"
            onPress={handleLogin}
            disabled={!isFormValid}
          />

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

export default LoginScreen;
