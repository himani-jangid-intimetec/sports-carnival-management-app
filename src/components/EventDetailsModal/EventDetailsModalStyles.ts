import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  actions: {
    gap: 12,
    marginTop: 20,
  },

  dangerBtn: {
    alignItems: 'center',
    backgroundColor: colors.error,
    borderRadius: 10,
    padding: 14,
    paddingHorizontal: 30,
  },

  dangerText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },

  details: {
    marginTop: 10,
  },

  editText: {
    color: colors.appBackground,
    fontWeight: 'bold',
  },

  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  meta: {
    color: colors.textPrimary,
    fontSize: 20,
    marginVertical: 10,
  },

  overlay: {
    backgroundColor: colors.appBackground + '40',
    flex: 1,
  },

  primaryBtn: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 14,
  },

  primaryText: {
    color: colors.appBackground,
    fontWeight: 'bold',
  },

  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },

  rowActions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  secondaryBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    paddingHorizontal: 30,
  },

  secondaryText: {
    color: colors.appBackground,
    fontSize: 14,
    fontWeight: '600',
  },

  sheet: {
    backgroundColor: colors.appBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    padding: 20,
    position: 'absolute',
    width: '100%',
  },

  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  status_COMPLETED: {
    backgroundColor: colors.error + '20',
    borderRadius: 20,
    color: colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  status_LIVE: {
    backgroundColor: colors.participantBackgroud + '20',
    borderRadius: 20,
    color: colors.participantBackgroud,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  status_OPEN: {
    backgroundColor: colors.matchesIconBackgound + '20',
    borderRadius: 20,
    color: colors.matchesIconBackgound,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  status_UPCOMING: {
    backgroundColor: colors.usersIconBackground + '20',
    borderRadius: 20,
    color: colors.usersIconBackground,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
