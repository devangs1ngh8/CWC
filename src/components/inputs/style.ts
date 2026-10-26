import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    marginBottom: normalize(20),
  },

  label: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: normalize(8),
    marginHorizontal: normalize(4),
  },

  input: {
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(16),
    borderWidth: 1,
    borderRadius: normalize(14),
    borderColor: colors.border,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    fontWeight: '500',
    color: 'colors.textSecondary',
    marginHorizontal: normalize(4),
  },

  passwordContainer: {
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(16),
    borderWidth: 1,
    borderRadius: normalize(14),
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalize(4),
  },

  passwordInput: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Bold',
    fontWeight: '500',
    color: colors.textSecondary,
  },

  error: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    color: colors.error,
    marginHorizontal: normalize(4),
  },

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(8),
    marginLeft: normalize(4),
  },

  errorIcon: {
    width: normalize(16),
    height: normalize(16),
    marginRight: normalize(6),
  },

  showImg: {
    width: normalize(20),
    height: normalize(20),
  },

  hideImg: {
    width: normalize(20),
    height: normalize(20),
  },

  inputError: {
    borderColor: colors.error,
  },
});

export default styles;
