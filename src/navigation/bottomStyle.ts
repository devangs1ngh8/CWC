import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../utils/metrics';
import colors from '../utils/color';

export const activeColor = '#793466';
export const inactiveColor = '#A6A6A6';

const styles = StyleSheet.create({
  tabBar: {
    height: SCREEN_HEIGHT * 0.12,
    backgroundColor: colors.textTertiary,
    shadowOpacity: 0.3,
    shadowColor: colors.border,
  },

  icon: {
    width: normalize(24),
    height: normalize(24),
  },

  labelContainer: {
    alignItems: 'center',
  },

  label: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Medium',
  },

  activeLabel: {
    fontFamily: 'Manrope-SemiBold',
  },

  activeDot: {
    width: normalize(6),
    height: normalize(6),
    borderRadius: normalize(4),
    backgroundColor: activeColor,
    marginTop: normalize(6),
  },
});

export default styles;
