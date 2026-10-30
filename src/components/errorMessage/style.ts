import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

export default StyleSheet.create({
  error: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    color: colors.error,
    marginHorizontal: normalize(4),
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(8),
    marginLeft: normalize(4),
  },

  errorIcon: {
    width: normalize(16),
    height: normalize(16),
    marginRight: normalize(6),
  },
});
