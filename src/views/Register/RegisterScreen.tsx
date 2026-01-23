import React, { useState } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Eye, EyeOff, Lock, Mail, Trophy, User } from 'lucide-react-native';
import { useRegisterViewModel } from '../../viewModels/RegisterViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import ScreenWrapper from '../../components/ScreenWrapper/ScreenWrapper';
import AppInput from '../../components/AppInput/AppInput';
import AppButton from '../../components/AppButton/AppButton';
import { validationMessages } from '../../constants/validationMessages';
import { styles } from './RegisterScreenStyles';
import { APP_STRINGS } from '../../constants/appStrings';

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
      Alert.alert(validationMessages.LOGIN_ERROR, error);
      return;
    }

    navigation.navigate('RoleSelection');
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
              {APP_STRINGS.app.registerTagline}
            </Text>
          </View>
        </View>

        <View style={styles.entryContainer}>
          <Text style={styles.cardHeadingText}>
            {APP_STRINGS.auth.createAccount}
          </Text>
          <Text style={styles.cardHeadingSubText}>
            {APP_STRINGS.auth.signUpSubtitle}
          </Text>

          <View>
            <Text style={styles.inputLabels}>{APP_STRINGS.labels.name}</Text>
            <AppInput
              icon={<User size={20} color={colors.textSecondary} />}
              placeholder={APP_STRINGS.placeHolders.fullName}
              value={name}
              onChangeText={setName}
              onBlur={validateName}
              error={nameError}
            />
          </View>

          <View>
            <Text style={styles.inputLabels}>{APP_STRINGS.labels.email}</Text>
            <AppInput
              icon={<Mail size={20} color={colors.textSecondary} />}
              placeholder={APP_STRINGS.placeHolders.email}
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
              error={emailError}
            />
          </View>

          <View>
            <Text style={styles.inputLabels}>
              {APP_STRINGS.labels.password}
            </Text>
            <AppInput
              icon={<Lock size={20} color={colors.textSecondary} />}
              placeholder={APP_STRINGS.placeHolders.createPassword}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onBlur={validatePassword}
              error={passwordError}
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
          </View>

          <AppButton
            onPress={handleRegister}
            title={APP_STRINGS.buttons.createAccount}
            disabled={!isFormValid}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {APP_STRINGS.footer.accountAlready}
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerButtonText}>
                {APP_STRINGS.buttons.signIn}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default RegisterScreen;
