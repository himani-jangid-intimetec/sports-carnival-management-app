import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    color: colors.appBackground,
    fontSize: 30,
  },
  logoContainer: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    padding: 10,
  },
  noTeamStyle: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});
