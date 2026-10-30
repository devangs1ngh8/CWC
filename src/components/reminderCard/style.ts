import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(24),
    padding: normalize(20),
    marginBottom: normalize(16),
  },

  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bellIcon: {
    width: normalize(50),
    height: normalize(50),
    marginRight: normalize(12),
  },

  details: {
    flex: 1,
  },

  title: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(6),
  },

  subtitle: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  weekdays: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
    marginTop: normalize(6),
  },

  day: {
    width: normalize(26),
    height: normalize(24),
    borderRadius: normalize(44),
    borderWidth: 1,
    borderColor: colors.border,
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: normalize(12),
    fontFamily: 'Manrope-SemiBold',
    paddingTop: normalize(2),
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: normalize(12),
  },

  buttons: {
    flexDirection: 'row',
    gap: normalize(12),
  },

  button: {
    flex: 1,
    paddingVertical: normalize(10),
    borderWidth: 1,
    borderColor: colors.border5,
    borderRadius: normalize(11),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(6),
  },

  buttonIcon: {
    width: normalize(15),
    height: normalize(15),
  },

  buttonText: {
    color: colors.primary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
  },
});

export default styles;
