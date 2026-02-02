import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';
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
  keyboardType?: KeyboardTypeOptions;
  optionalEyeIcon?: React.ReactNode;
  editable?: boolean;
  onPressIn?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
};

const AppInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onBlur,
  error,
  keyboardType,
  optionalEyeIcon,
  editable,
  onPressIn,
  autoCapitalize,
  autoCorrect,
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
          keyboardType={keyboardType}
          editable={editable}
          pointerEvents={editable === false ? 'none' : 'auto'}
          onPressIn={onPressIn}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        {optionalEyeIcon}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default AppInput;
