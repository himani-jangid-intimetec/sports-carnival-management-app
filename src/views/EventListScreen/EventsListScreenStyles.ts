import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  footerNote: {
    alignItems: 'center',
    marginTop: 16,
  },

  footerText: {
    color: colors.textSecondary,
    fontFamily: fonts.subHeading,
    fontSize: 12,
  },

  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heading: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
  },

  headingParticipant: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  noEventStyle: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});
