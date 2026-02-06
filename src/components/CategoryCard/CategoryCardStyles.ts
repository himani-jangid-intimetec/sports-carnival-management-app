import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  abandonedBadge: {
    backgroundColor: colors.textSecondary + '30',
    borderRadius: 8,
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
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
  progressBar: {
    backgroundColor: colors.inputField,
    borderRadius: 4,
    height: 6,
    marginTop: 8,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    borderRadius: 4,
    height: '100%',
  },
  slotsBadge: {
    backgroundColor: colors.error + '20',
    borderRadius: 8,
    color: colors.error,
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 2,
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
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 4,
  },
});
