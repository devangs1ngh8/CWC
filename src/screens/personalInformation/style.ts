import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },

  body: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingHorizontal: normalize(24),
  },

  titleContent: {
    flexDirection: 'column',
    alignSelf: 'stretch',
  },

  stepTitle: {
    color: colors.primary,
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(13),
    marginBottom: normalize(8),
  },

  screenTitle: {
    color: colors.textPrimary,
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(22),
  },

  label: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    color: colors.textSecondary,
    marginTop: normalize(20),
  },

  placeholderColor: {
    color: colors.textFourth,
  },

  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.buttonBG,
    borderRadius: normalize(10),
    padding: normalize(3),
  },

  bottomContent: {
    paddingTop: normalize(24),
  },

  weightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: normalize(12),
  },

  weightLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    color: colors.textSecondary,
  },

  weightInput: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    height: normalize(58),
    marginTop: normalize(8),
    color: colors.textPrimary,
    fontFamily: 'Manrope-Regular',
    fontSize: normalize(14),
  },

  error: {
    fontSize: normalize(12),
    color: colors.error,
    marginTop: normalize(8),
  },

  filledInput: {
    borderColor: colors.buttonBG4,
  },
});

export default styles;
