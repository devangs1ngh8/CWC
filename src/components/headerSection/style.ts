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
});

export default styles;
