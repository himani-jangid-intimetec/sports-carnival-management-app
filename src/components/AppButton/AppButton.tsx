import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './AppButtonStyles';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const AppButton = ({ title, onPress, disabled }: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AppButton;
