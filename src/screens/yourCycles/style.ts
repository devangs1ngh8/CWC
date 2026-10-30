import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },

  stepTitle: {
    color: colors.primary,
    fontSize: normalize(13),
    fontFamily: 'Manrope-Bold',
  },

  screenTitle: {
    fontSize: normalize(22),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  titleContent: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginBottom: normalize(24),
  },

  label: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
    marginTop: normalize(18),
    marginBottom: normalize(6),
  },

  cycleLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
    marginTop: normalize(4),
  },

  infoIcon: {
    width: normalize(16),
    height: normalize(16),
    marginTop: normalize(13),
  },

  bottomContent: {
    paddingTop: normalize(21),
    backgroundColor: colors.textTertiary,
  },

  selectedBorder: {
    borderColor: colors.border5,
    borderWidth: 1,
    borderRadius: normalize(16),
  },
});
