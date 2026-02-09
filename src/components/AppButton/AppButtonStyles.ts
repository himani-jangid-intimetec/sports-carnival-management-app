import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

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
    color: colors.appBackground,
    fontSize: fontsSize.regular,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
