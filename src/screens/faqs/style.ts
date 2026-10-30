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
    paddingVertical: normalize(32),
  },

  scrollContent: {
    paddingBottom: normalize(24),
    gap: normalize(16),
  },

  card: {
    borderRadius: normalize(24),
    padding: normalize(20),
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadowColor,
    shadowOffset: { height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: normalize(12),
  },

  question: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
  },

  arrow: {
    width: normalize(20),
    height: normalize(20),
  },

  divider: {
    height: normalize(1),
    backgroundColor: colors.border,
    marginVertical: normalize(12),
  },

  answer: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
    lineHeight: normalize(23),
  },
});

export default styles;
