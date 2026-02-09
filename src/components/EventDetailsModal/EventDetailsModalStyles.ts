import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

const HALF_HEIGHT = Dimensions.get('window').height * 0.6;

export const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: colors.primary,
  },
  activeTabText: {
    color: colors.appBackground,
    fontWeight: '600',
  },
  buttonContainer: {
    width: 120,
  },
  centerButton: {
    alignItems: 'center',
    marginTop: 12,
  },
  content: {
    flex: 1,
    marginVertical: 12,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: fontsSize.large,
    marginTop: 20,
    textAlign: 'center',
  },
  footer: {
    gap: 8,
    marginTop: 8,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listItem: {
    color: colors.textPrimary,
    fontSize: fontsSize.medium,
    paddingVertical: 6,
  },
  modalContainer: {
    backgroundColor: colors.appBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: HALF_HEIGHT,
    padding: 16,
  },
  overlay: {
    backgroundColor: colors.appBackground + '20',
    flex: 1,
    justifyContent: 'flex-end',
  },
  prizeCard: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderRadius: 16,
    flexDirection: 'row',
    padding: 16,
  },
  prizeEmoji: {
    fontSize: 22,
  },
  prizeIcon: {
    alignItems: 'center',
    backgroundColor: colors.disabled,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginRight: 12,
    width: 48,
  },
  prizeList: {
    gap: 12,
  },
  prizeTitle: {
    color: colors.textPrimary,
    fontSize: fontsSize.regular,
    fontWeight: '600',
  },
  prizeValue: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fontsSize.regular,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    marginBottom: 10,
  },
  statusText: {
    fontSize: fontsSize.small,
    fontWeight: 'bold',
  },
  status_CANCELLED: {
    backgroundColor: colors.error + '20',
    borderRadius: 20,
    color: colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    color: colors.matchesIconBackgound,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  tabButton: {
    alignItems: 'center',
    backgroundColor: colors.inputField,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
  },
  tabRow: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: fontsSize.primary,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 12,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontsSize.large,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
});
