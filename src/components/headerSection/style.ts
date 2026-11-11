import { StyleSheet } from 'react-native';
import colors from '../../utils/color';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },

  logo: {
    position: 'absolute',
    left: normalize(32),
    bottom: normalize(32),
  },

  headerImg: {
    top: normalize(SCREEN_HEIGHT <= 700 ? 20 : 35),
    width: '100%',
    height: '100%',
  },

  titleRow: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.08,
    left: normalize(24),
    right: normalize(24),
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: normalize(40),
    height: normalize(40),
  },

  backButtonContainer: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    position: 'absolute',

    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.textTertiary,
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(24),
  },
});

export default styles;
