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
    gap: normalize(24),
  },

  description: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
    lineHeight: normalize(23),
  },
});

export default styles;
