import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  footerContainer: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    paddingTop: 20,
  },
  footerText: {
    color: colors.textSecondary,
  },
  gameStatus: {
    fontWeight: 'bold',
  },
  gameStatusCompleted: {
    backgroundColor: colors.error + '20',
    borderColor: colors.error,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.error,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  gameStatusLive: {
    backgroundColor: colors.participantBackgroud + '20',
    borderColor: colors.participantBackgroud,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.participantBackgroud,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  gameStatusUpcoming: {
    backgroundColor: colors.usersIconBackground + '20',
    borderColor: colors.usersIconBackground,
    borderRadius: 14,
    borderWidth: 1,
    color: colors.usersIconBackground,
    fontWeight: 'bold',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  gameTitle: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  leadingScore: {
    color: colors.participantBackgroud,
    fontWeight: 'bold',
  },
  logoContainer: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    color: colors.appBackground,
    marginBottom: 10,
    marginTop: 15,
    padding: 10,
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
  },
  pointsStyle: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statusStyle: {
    color: colors.participantBackgroud,
  },
  teamContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  teamName: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textStyle: {
    color: colors.textSecondary,
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
