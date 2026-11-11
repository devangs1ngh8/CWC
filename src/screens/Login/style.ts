import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
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
    fontFamily: 'Manrope-Bold',
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
  },

  link: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.primary,
  },
});

export default styles;
