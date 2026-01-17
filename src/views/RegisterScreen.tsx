import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from '../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, Mail, Trophy, User } from 'lucide-react-native';
import { useRegisterViewModel } from '../viewModels/RegisterViewModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';

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
  } = useRegisterViewModel();

  type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <View
              style={
                Platform.OS === 'ios'
                  ? styles.iosInputFieldContainer
                  : styles.androidInputFieldContainer
              }
            >
              <User size={20} color={colors.textSecondary} />
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSecondary}
                value={name}
                onChangeText={setName}
                style={styles.inputField}
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabels}>Email</Text>
            <View
              style={
                Platform.OS === 'ios'
                  ? styles.iosInputFieldContainer
                  : styles.androidInputFieldContainer
              }
            >
              <Mail size={20} color={colors.textSecondary} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                style={styles.inputField}
              />
            </View>
          </View>

          <View>
            <Text style={styles.inputLabels}>Password</Text>
            <View
              style={
                Platform.OS === 'ios'
                  ? styles.iosInputFieldContainer
                  : styles.androidInputFieldContainer
              }
            >
              <Lock size={20} color={colors.textSecondary} />
              <TextInput
                placeholder="Create a password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                style={styles.inputField}
                secureTextEntry
              />
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerButtonText}>Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  androidInputFieldContainer: {
    alignItems: 'center',
    backgroundColor: colors.inputField,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    color: colors.textPrimary,
    marginVertical: 20,
    padding: 10,
  },
  buttonText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
  errorText: {
    color: colors.error,
    marginTop: 15,
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
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginTop: 3,
  },
  headingText: {
    color: colors.textPrimary,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 35,
    fontWeight: 'bold',
  },
  inputField: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
  },
  inputLabels: {
    color: colors.textPrimary,
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    marginTop: 20,
  },
  iosInputFieldContainer: {
    alignItems: 'center',
    backgroundColor: colors.inputField,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    padding: 10,
    paddingLeft: 8,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
});

export default RegisterScreen;
