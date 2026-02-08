import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

export const styles = StyleSheet.create({
  bullet: {
    color: colors.primary,
    fontSize: fontsSize.regular,
    marginRight: 6,
  },
  card: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    width: '100%',
  },
  checkIcon: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 4,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  description: {
    color: colors.textSecondary,
    fontSize: fontsSize.regular,
  },
  featureItem: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 6,
  },
  featureText: {
    color: colors.textSecondary,
    flex: 1,
    fontSize: fontsSize.regular,
  },
  features: {
    marginTop: 8,
  },
  selectedCard: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});
