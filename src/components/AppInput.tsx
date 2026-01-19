import React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

type EntryInputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  error?: string;
};

const AppInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onBlur,
  error,
}: EntryInputProps) => {
  return (
    <View>
        <View style={[styles.container, error && styles.errorBorder]}>
        {icon}
        <TextInput
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            onBlur={onBlur}
            style={styles.input}
        />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.inputField,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    padding: Platform.OS === 'ios' ? 10 : 3,
    paddingLeft: 8,
  },
  errorBorder: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 4,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
  },
});

export default AppInput;
