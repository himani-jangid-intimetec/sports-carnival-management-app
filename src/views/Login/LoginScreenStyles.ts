import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 35,
    paddingHorizontal: 40,
    paddingVertical: 20,
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
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 16,
    marginTop: 3,
  },
  headingText: {
    color: colors.textPrimary,
    fontFamily: 'Outfit-SemiBold',
    fontSize: 35,
    fontWeight: 'bold',
  },
  inputLabels: {
    color: colors.textPrimary,
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 18,
    marginTop: 20,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
});
