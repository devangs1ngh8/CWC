import { StyleSheet } from 'react-native';
import colors from '../../utils/color';
import { normalize } from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },

  logo: {
    position: 'absolute',
    left: normalize(32),
    bottom: normalize(32),
  },

  titleRow: {
    position: 'absolute',
    top: normalize(80),
    left: normalize(24),
    right: normalize(24),
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: normalize(40),
    height: normalize(40),
    borderColor: colors.textTertiary,
    borderRadius: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(26),
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
