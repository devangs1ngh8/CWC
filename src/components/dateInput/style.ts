import { StyleSheet } from 'react-native';

import { normalize, SCREEN_WIDTH } from '../../utils/metrics';
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

  inputError: {
    borderColor: colors.error,
  },

  // Modal overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Picker container
  datePickerContainer: {
    width: SCREEN_WIDTH - normalize(40),
    backgroundColor: colors.background,
    borderRadius: normalize(20),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(12),
    overflow: 'hidden',
  },

  // Done button above wheel
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: normalize(12),
    paddingBottom: normalize(4),
  },

  doneText: {
    color: colors.primary,
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(15),
    padding: normalize(8),
  },

  datePicker: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default styles;
