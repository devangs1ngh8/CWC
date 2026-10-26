import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },

  secondaryTextStyle: {
    color: colors.primary,
  },

  otpContainer: {
    gap: normalize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(4),
  },

  otpBox: {
    width: normalize(52),
    height: normalize(55),
    borderWidth: normalize(1),
    borderRadius: normalize(14),
    textAlign: 'center',
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textPrimary,
    backgroundColor: colors.textTertiary,
    borderColor: colors.borderColor,
  },

  activeOtpBox: {
    borderColor: colors.primary,
    borderWidth: 1,
  },

  errorText: {
    color: colors.error,
    fontSize: normalize(12),
    marginTop: normalize(8),
    fontFamily: 'Manrope-Regular',
  },

  bottomContainer: {
    paddingTop: normalize(12),
  },
});

export default styles;
