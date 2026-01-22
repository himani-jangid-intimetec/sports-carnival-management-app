import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  heading: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  inputContainer: {
    flex: 2,
  },

  inputLabels: {
    color: colors.textPrimary,
    fontFamily: fonts.subHeading,
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
  },

  inputRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-evenly',
  },

  primaryBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: 20,
    padding: 16,
  },

  primaryText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
