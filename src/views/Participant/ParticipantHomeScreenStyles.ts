import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

const ACTION_CARD_GAP = 12;
const HORIZONTAL_PADDING = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const ACTION_CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - ACTION_CARD_GAP * 2) / 2;

export const styles = StyleSheet.create({
  actionCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  actionCardWrapper: {
    width: ACTION_CARD_WIDTH,
  },
  analyticsGrid: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 25,
  },
  container: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 10,
    padding: 24,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: fontsSize.medium,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: fontsSize.extraLarge,
    fontWeight: 'bold',
    marginLeft: 10,
    paddingTop: 5,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 20,
    paddingLeft: 2,
  },
  logoStyle: {
    color: colors.appBackground,
    fontSize: fontsSize.large,
    fontWeight: 'bold',
  },
  matchCard: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    marginHorizontal: 10,
    padding: 16,
  },
  matchInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  matchInfoText: {
    color: colors.textSecondary,
    fontSize: fontsSize.primary,
    marginLeft: 4,
  },
  matchSport: {
    color: colors.textSecondary,
    fontSize: fontsSize.primary,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  matchTeamName: {
    color: colors.textPrimary,
    fontSize: fontsSize.regular,
    fontWeight: '600',
  },
  matchTeams: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 18,
    marginLeft: 10,
    paddingTop: 10,
  },
  vsText: {
    color: colors.textSecondary,
    fontSize: fontsSize.medium,
    marginHorizontal: 12,
  },
});
