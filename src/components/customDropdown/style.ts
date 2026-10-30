import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../utils/color';
import { normalize } from '../../utils/metrics';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.textTertiary,
  },

  dropdownText: {
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: normalize(18),
    fontFamily: 'Manrope-Medium',
  },

  dropdownSelected: {
    borderColor: colors.buttonBG4,
  },

  arrow: {
    width: normalize(20),
    height: normalize(20),
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: normalize(24),
    paddingTop: normalize(9),
    paddingBottom: 57,
    maxHeight: height * 0.88,
    shadowOpacity: 0.5,
    shadowColor: colors.primary,
  },

  handle: {
    width: normalize(20),
    height: normalize(4),
    borderRadius: normalize(30),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(35),
  },

  title: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: normalize(20),
  },

  option: {
    paddingVertical: normalize(12),
    borderRadius: normalize(9),
    paddingHorizontal: normalize(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selectedOption: {
    backgroundColor: colors.buttonBG4,
  },

  optionText: {
    fontSize: normalize(18),
    color: colors.textPrimary,
    fontFamily: 'Manrope-SemiBold',
  },

  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },

  check: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(60),
  },
});
