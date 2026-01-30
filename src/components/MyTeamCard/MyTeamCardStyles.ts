import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  bottomRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

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

  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  memberText: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 2,
  },

  memberTextMuted: {
    color: colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },

  membersContainer: {
    marginTop: 8,
  },

  sportBadge: {
    backgroundColor: colors.cardBackgroud,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  sportText: {
    backgroundColor: colors.inputField,
    borderRadius: 12,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 4,
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
