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
  },

  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(4),
    marginRight: normalize(12),
    borderWidth: normalize(1),
    borderColor: colors.borderColor,
  },

  checkboxSelected: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(4),
    marginRight: normalize(12),
  },

  tickIcon: {
    width: normalize(20),
    height: normalize(20),
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

  bottomContent: {},

  createTextRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(16),
    gap: normalize(3),
  },

  createText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },
});

export default styles;
