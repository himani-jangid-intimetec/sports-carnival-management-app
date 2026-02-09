import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

export const styles = StyleSheet.create({
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
    fontSize: fontsSize.medium,
    marginTop: 4,
  },
  input: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: fontsSize.regular,
  },
});
