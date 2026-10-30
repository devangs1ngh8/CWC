import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: normalize(12),
    marginTop: normalize(8),
  },

  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
  },

  input: {
    flex: 1,
    paddingVertical: normalize(18),
    color: colors.textPrimary,
    fontFamily: 'Manrope-Regular',
    fontSize: normalize(14),
  },

  suffix: {
    color: colors.textSecondary,
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(13),
  },

  activeInput: {
    borderColor: colors.activeBorderColor,
  },
});

export default styles;
