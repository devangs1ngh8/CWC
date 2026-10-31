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
    bottom: 32,
  },

  backButton: {
    position: 'absolute',
    top: normalize(71),
    left: normalize(24),
    width: normalize(40),
    height: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
