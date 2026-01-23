import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: colors.appBackground,
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
