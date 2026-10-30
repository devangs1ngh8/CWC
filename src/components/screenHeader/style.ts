import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },

  backButton: {
    position: 'absolute',
    left: normalize(24),
    top: normalize(70),
  },

  backArrow: {
    width: normalize(40),
    height: normalize(40),
  },

  title: {
    color: colors.textTertiary,
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    textAlign: 'center',
    marginTop: normalize(20),
  },
});

export default styles;
