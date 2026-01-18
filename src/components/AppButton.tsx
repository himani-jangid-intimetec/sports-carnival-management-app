import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const AppButton = ({ title, onPress, disabled }: Props) => {
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginVertical: 20,
    padding: 14,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppButton;
