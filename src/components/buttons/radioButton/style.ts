import { StyleSheet } from 'react-native';
import colors from '../../../utils/color';
import { normalize } from '../../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(16),
    marginBottom: normalize(20),
    backgroundColor: colors.textTertiary,
    marginHorizontal: normalize(10),
  },

  selectedContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.buttonBG2,
  },

  radio: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: normalize(11),
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(12),
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

  title: {
    fontSize: normalize(16),
    fontWeight: 600,
    color: colors.textPrimary,
    fontFamily: 'Manrope-Medium',
  },
});

export default styles;
