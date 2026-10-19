import { StyleSheet } from 'react-native';
import { normalize } from '../../../utils/metrics';
import colors from '../../../utils/color';

const styles = StyleSheet.create({
  button: {
    paddingVertical: normalize(18),
    borderRadius: normalize(14),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(24),
  },

  pressed: {
    opacity: 0.85,
  },

  title: {
    color: colors.textTertiary,
    fontSize: normalize(16),
    fontWeight: 600,
    fontFamily: 'Manrope-Regular',
  },
});

export default styles;
