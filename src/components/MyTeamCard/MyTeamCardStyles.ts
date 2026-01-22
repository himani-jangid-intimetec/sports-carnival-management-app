import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  bottomRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  captainText: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 4,
  },

  container: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
  },

  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginVertical: 16,
  },

  logoContainer: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },

  lossText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },

  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },

  playerCount: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  playerText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },

  sportBadge: {
    backgroundColor: colors.cardBackgroud,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  sportText: {
    backgroundColor: colors.inputField,
    borderRadius: 13,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    padding: 8,
  },

  statsDetails: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },

  teamInfo: {
    flex: 1,
  },

  teamName: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },

  topRow: {
    flexDirection: 'row',
    gap: 16,
  },

  winRateText: {
    color: colors.participantBackgroud,
    fontSize: 16,
    fontWeight: 'bold',
  },

  winText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});
