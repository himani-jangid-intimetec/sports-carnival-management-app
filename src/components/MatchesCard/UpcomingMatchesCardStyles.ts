import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 20,
    padding: 20,
  },

  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: 16,
  },

  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },

  liveBadge: {
    backgroundColor: colors.usersIconBackground + '20',
    borderColor: colors.usersIconBackground,
    borderWidth: 1,
  },

  liveText: {
    color: colors.usersIconBackground,
    fontWeight: '600',
  },

  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },

  metaText: {
    color: colors.textSecondary,
    fontSize: 15,
  },

  progressBar: {
    backgroundColor: colors.border,
    borderRadius: 10,
    height: 8,
    overflow: 'hidden',
    width: 90,
  },

  progressFill: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: '100%',
  },

  registrationBadge: {
    backgroundColor: colors.matchesIconBackgound + '20',
    borderColor: colors.matchesIconBackgound,
    borderWidth: 1,
  },

  registrationText: {
    color: colors.matchesIconBackgound,
    fontWeight: '600',
  },

  sportText: {
    color: colors.textSecondary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  statusText: {
    fontSize: 13,
  },

  teamInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  teamMuted: {
    color: colors.textSecondary,
    fontWeight: '400',
  },

  teamText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
});
