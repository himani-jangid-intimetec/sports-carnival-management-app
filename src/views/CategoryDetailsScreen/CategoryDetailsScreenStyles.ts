import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontsSize } from '../../theme/fonts';

export const styles = StyleSheet.create({
  activeFixtureTab: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  activeFixtureTabText: {
    color: colors.primary,
  },
  activeMainTab: {
    backgroundColor: colors.primary,
  },
  activeMainTabText: {
    color: colors.primaryText,
    fontWeight: '600',
  },
  backButton: {
    padding: 4,
  },
  centerButton: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: fontsSize.medium,
    marginBottom: 16,
    textAlign: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: fontsSize.regular,
    marginTop: 40,
    textAlign: 'center',
  },
  fixtureTabButton: {
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 6,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  fixtureTabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fixtureTabText: {
    color: colors.textSecondary,
    fontSize: fontsSize.primary,
    fontWeight: '500',
  },
  fixturesContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRight: {
    width: 32,
  },
  headerTitle: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  mainTabButton: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
  },
  mainTabRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mainTabText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  participantAvatar: {
    alignItems: 'center',
    backgroundColor: colors.primary + '20',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  participantCard: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 12,
  },
  participantIndex: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  participantInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 12,
  },
  participantName: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '500',
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: colors.cardBackgroud,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 15,
    marginLeft: 8,
    padding: 0,
  },
  thresholdText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginBottom: 12,
    textAlign: 'center',
  },
});
