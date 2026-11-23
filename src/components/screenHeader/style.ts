import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
  },

  headingContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(12),
  },

  backButton: {
    position: 'absolute',
    left: normalize(24),
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
  },
});

export default styles;
