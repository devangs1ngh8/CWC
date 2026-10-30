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

  primaryTextStyle: {
    color: colors.primary,
  },

  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(24),
  },

  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(4),
    marginRight: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkmark: {
    color: colors.textTertiary,
    fontSize: normalize(16),
    lineHeight: normalize(18),
  },

  consentTextRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: normalize(4),
  },

  consentText: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
  },

  link: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
  },

  bottomContent: {
    // paddingTop: normalize(24),
  },

  createTextRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(16),
  },

  createText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },
});

export default styles;
