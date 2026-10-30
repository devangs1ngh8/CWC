import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  body: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(32),
  },
  options: {
    gap: normalize(20),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    borderRadius: normalize(16),
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.textTertiary,
    gap: normalize(12),
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundBG4,
    shadowColor: colors.primary,
    shadowOffset: { height: normalize(6) },
    shadowOpacity: 0.12,
    shadowRadius: normalize(8),
  },
  radio: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(11),
    borderWidth: normalize(1.5),
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadio: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: normalize(10),
    height: normalize(10),
    borderRadius: normalize(6),
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textPrimary,
    paddingVertical: normalize(17),
  },
});

export default styles;
