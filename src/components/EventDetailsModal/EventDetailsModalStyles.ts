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
    marginBottom: 10,
    padding: 14,
  },

  dangerText: {
    color: colors.textPrimary,
    fontWeight: '600',
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
    color: colors.textSecondary,
    marginBottom: 6,
  },

  overlay: {
    backgroundColor: colors.appBackground + '40',
    flex: 1,
  },

  primaryBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 14,
  },

  primaryText: {
    color: colors.appBackground,
    fontWeight: 'bold',
  },

  secondaryBtn: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
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

  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
});
