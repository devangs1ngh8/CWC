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
    marginBottom: normalize(7),
  },

  description: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
    marginTop: normalize(16),
    marginBottom: normalize(12),
    textAlign: 'left',
    paddingRight: normalize(30),
    marginLeft: 0,
  },

  label: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
    marginTop: normalize(16),
    marginBottom: normalize(6),
  },

  radioRow: {
    flexDirection: 'row',
    gap: normalize(12),
  },

  radioOption: {
    flex: 1,
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(14),
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(10),
    gap: normalize(10),
  },

  radioOptionSelected: {
    borderColor: colors.primary,
  },

  radioCircle: {
    width: normalize(20),
    height: normalize(20),
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    borderRadius: normalize(10),
  },

  radioCircleSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  radioText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  radioTextSelected: {
    color: colors.primary,
    fontFamily: 'Manrope-Bold',
  },

  locationRow: {
    flexDirection: 'row',
    gap: normalize(12),
  },

  halfColumn: {
    flex: 1,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: normalize(16),
    gap: normalize(12),
  },

  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: normalize(1),
    borderColor: colors.borderColor,
  },

  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  checkboxTick: {
    color: colors.textTertiary,
    fontSize: normalize(15),
    fontFamily: 'Manrope-Bold',
  },

  checkboxText: {
    flex: 1,
    fontSize: normalize(14),
    lineHeight: normalize(20),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
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
