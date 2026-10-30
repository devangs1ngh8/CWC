import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(18),
    marginTop: normalize(7),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  value: {
    color: colors.textPrimary,
    fontFamily: 'Manrope-Regular',
    fontSize: normalize(14),
  },

  placeholder: {
    color: colors.textFourth,
  },

  calendarIcon: {
    width: normalize(15),
    height: normalize(16),
    tintColor: colors.primary,
  },

  doneButton: {
    alignSelf: 'flex-end',
    padding: normalize(10),
  },

  doneText: {
    color: colors.primary,
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(14),
  },

  inputError: {
    borderColor: colors.error,
  },
});

export default styles;
