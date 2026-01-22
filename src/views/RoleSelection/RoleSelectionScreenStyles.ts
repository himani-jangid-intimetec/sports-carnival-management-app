import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 20,
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
  iconContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
  subHeadingSubText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  subHeadingText: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
  },
});
