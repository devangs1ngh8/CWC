import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    color: colors.textSecondary,
    marginTop: normalize(24),
  },

  input: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(18),
    marginTop: normalize(8),
    color: colors.textPrimary,
    fontFamily: 'Manrope-Regular',
    fontSize: normalize(14),
  },

  placeholderColor: {
    color: colors.textFourth,
  },

  activeInput: {
    borderColor: colors.activeBorderColor,
  },

  inputError: {
    borderColor: colors.error,
  },
});

export default styles;
