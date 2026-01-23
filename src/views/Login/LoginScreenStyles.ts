import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  cardHeadingSubText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  cardHeadingText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
    padding: 20,
  },
  entryContainer: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 35,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  eyeIcon: {
    paddingRight: Platform.OS === 'android' ? 5 : 0,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  footerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 16,
    marginTop: 15,
    textAlign: 'right',
  },
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  headingSubText: {
    color: colors.textSecondary,
    fontFamily: fonts.subHeading,
    fontSize: 16,
    marginTop: 3,
  },
  headingText: {
    color: colors.textPrimary,
    fontFamily: fonts.heading,
    fontSize: 35,
    fontWeight: 'bold',
  },
  inputLabels: {
    color: colors.textPrimary,
    fontFamily: fonts.subHeading,
    fontSize: 18,
    marginTop: 20,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
});
