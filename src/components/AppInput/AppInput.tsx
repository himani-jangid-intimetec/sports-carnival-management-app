import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from './AppInputStyles';

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

export default AppInput;
