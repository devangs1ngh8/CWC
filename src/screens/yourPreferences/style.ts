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

  body: {
    flex: 1,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    // paddingHorizontal: normalize(24),
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
    marginBottom: normalize(20),
  },

  optionsContainer: {
    // marginTop: normalize(2),
    gap: normalize(16),
  },

  option: {
    borderWidth: normalize(1),
    borderColor: colors.border,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },

  optionSelected: {
    borderColor: colors.primary,
  },

  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderWidth: normalize(1),
    borderColor: colors.borderColor,
    borderRadius: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionText: {
    // flex: 1,
    color: colors.textPrimary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Bold',
    paddingVertical: normalize(16),
  },

  bottomContent: {
    paddingTop: normalize(37),
    backgroundColor: colors.background,
  },
});
