import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
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
