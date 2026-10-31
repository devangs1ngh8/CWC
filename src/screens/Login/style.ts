import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },

  primaryTextStyle: {
    color: colors.primary,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginTop: normalize(8),
    marginHorizontal: normalize(4),
  },

  forgotText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    fontWeight: '700',
    color: colors.primary,
  },

  createTextRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: normalize(16),
    gap: normalize(3),
  },

  createText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    fontWeight: '500',
  },

  link: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    fontWeight: '500',
    color: colors.primary,
  },
});

export default styles;
