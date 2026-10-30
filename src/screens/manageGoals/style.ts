import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  body: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingHorizontal: normalize(24),
  },

  scrollContent: {
    paddingTop: normalize(32),
    paddingBottom: normalize(24),
  },

  goalsCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(24),
    padding: normalize(20),
    backgroundColor: colors.textTertiary,
  },

  goalRow: {
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },

  goalDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  goalIcon: {
    width: normalize(20),
    height: normalize(20),
  },

  goalTitle: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },
});

export default styles;
