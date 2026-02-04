import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  activeFormatTab: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  activeFormatText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 20,
    marginTop: 32,
  },
  checkIcon: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 24,
    justifyContent: 'center',
    width: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 20,
  },
  formatContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  formatOptionCard: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  formatOptionCardActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  formatOptionContent: {
    flex: 1,
  },
  formatOptionDesc: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  formatOptionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  formatSelectionContainer: {
    gap: 12,
  },
  formatTab: {
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formatText: {
    color: colors.textPrimary,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 70,
    marginBottom: 24,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 6,
    marginTop: 20,
  },
  subLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 12,
  },
});
