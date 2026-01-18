import React from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  icon?: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const AppInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: Props) => {
  return (
    <View style={styles.container}>
      {icon}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        style={styles.input}
      />
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
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
  },
});

export default AppInput;
