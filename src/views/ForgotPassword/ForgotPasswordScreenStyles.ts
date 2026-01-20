import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginTop: 30,
  },
  headingText: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputLabel: {
    color: colors.textPrimary,
    fontSize: 18,
    marginTop: 25,
  },
  subText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 20,
  },
  trophyContainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
  },
});
