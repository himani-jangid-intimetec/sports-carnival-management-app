import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Eye, EyeOff, Lock, Mail, Trophy } from 'lucide-react-native';
import { useLoginViewModel } from '../../viewModels/LoginViewModel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { styles } from './LoginScreenStyles';
import { APP_STRINGS } from '../../constants/appStrings';
import { useAuthStore } from '../../store/AuthStore';
import { RootStackParamList } from '../../navigation/AppNavigator';

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

  const { user } = useAuthStore();

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const handleLogin = async () => {
    const success = await onLogin();

    if (!success) return;
    if (!user) return;

    switch (user.role) {
      case 'admin':
        navigation.reset({
          index: 0,
          routes: [{ name: 'AdminTabs' }],
        });
        break;

      case 'organizer':
        navigation.reset({
          index: 0,
          routes: [{ name: 'OrganizerTabs' }],
        });
        break;

      case 'participant':
        navigation.reset({
          index: 0,
          routes: [{ name: 'ParticipantTabs' }],
        });
        break;
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScreenWrapper scrollable={true}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.trophyContainer}>
            <Trophy size={40} />
          </View>
          <View>
            <Text style={styles.headingText}>{APP_STRINGS.app.name}</Text>
            <Text style={styles.headingSubText}>
              {APP_STRINGS.app.loginTagline}
            </Text>
          </View>
        </View>

        <View style={styles.entryContainer}>
          <Text style={styles.cardHeadingText}>
            {APP_STRINGS.auth.welcomeBack}
          </Text>
          <Text style={styles.cardHeadingSubText}>
            {APP_STRINGS.auth.signInSubtitle}
          </Text>

          <Text style={styles.inputLabels}>{APP_STRINGS.labels.email}</Text>
          <AppInput
            icon={<Mail size={20} color={colors.textSecondary} />}
            placeholder={APP_STRINGS.placeHolders.email}
            value={email}
            onBlur={validateEmail}
            onChangeText={setEmail}
            error={emailError}
          />

          <Text style={styles.inputLabels}>{APP_STRINGS.labels.password}</Text>
          <AppInput
            icon={<Lock size={20} color={colors.textSecondary} />}
            placeholder={APP_STRINGS.placeHolders.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={passwordError}
            onBlur={validatePassword}
            optionalEyeIcon={
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color={colors.textSecondary} />
                ) : (
                  <Eye size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>
            }
          />

          <Pressable
            onPress={() =>
              navigation.navigate('Auth', { screen: 'ForgotPassword' })
            }
          >
            <Text style={styles.forgotPasswordText}>
              {APP_STRINGS.buttons.forgotPassword}
            </Text>
          </Pressable>

          <AppButton
            title={APP_STRINGS.buttons.signIn}
            onPress={handleLogin}
            disabled={!isFormValid}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {APP_STRINGS.footer.noAccount}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Auth', { screen: 'Register' })
              }
            >
              <Text style={styles.footerButtonText}>
                {APP_STRINGS.buttons.signUp}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;
