import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Lock, Mail, Trophy, User } from 'lucide-react-native';
import { useRegisterViewModel } from '../../viewModels/RegisterViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { VALIDATION_MESSAGES } from '../../constants/validationMessages';
import { styles } from './RegisterScreenStyles';

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

export default RegisterScreen;
