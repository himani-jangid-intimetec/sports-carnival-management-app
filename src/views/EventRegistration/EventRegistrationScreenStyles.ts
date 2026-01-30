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
});
