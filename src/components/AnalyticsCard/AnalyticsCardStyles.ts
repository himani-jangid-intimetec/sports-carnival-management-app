import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

const CARD_GAP = 12;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - 20 * 2 - CARD_GAP) / 2;

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: CARD_WIDTH,
  },
  data: {
    color: colors.textPrimary,
    fontSize: fontsSize.extraLarge,
    fontWeight: 'bold',
  },
  iconContainer: {
    backgroundColor: colors.inputField,
    borderRadius: 10,
    padding: 8,
  },
  title: {
    color: colors.textSecondary,
    fontSize: fontsSize.medium,
  },
});
