import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  arrow: {
    paddingLeft: 8,
  },
  arrowText: {
    color: colors.textSecondary,
    fontSize: 24,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  statsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statsText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});
