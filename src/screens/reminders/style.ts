import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textTertiary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.2,
  },

  content: {
    flex: 1,
    paddingTop: normalize(20),
  },

  list: {
    paddingHorizontal: normalize(24),
    paddingBottom: SCREEN_HEIGHT * 0.11,
  },

  addButton: {
    position: 'absolute',
    right: normalize(24),
    bottom: normalize(20),
  },

  addButtonImage: {
    width: normalize(56),
    height: normalize(56),
  },

  sheetTitle: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: normalize(24),
  },

  purpleText: {
    color: colors.primary,
  },

  sheetContent: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(50),
  },

  label: {
    fontSize: normalize(14),
    color: colors.textSecondary,
    marginTop: normalize(16),
    marginBottom: normalize(9),
    fontFamily: 'Manrope-Medium',
  },

  input: {
    minHeight: normalize(52),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: colors.textPrimary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
  },

  inputText: {
    fontSize: normalize(14),
    color: colors.textPrimary,
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(16),
  },

  disabledInput: {
    backgroundColor: colors.disableBGC,
    borderColor: colors.disableBorder,
    opacity: 0.7,
  },

  disabledFrequencyText: {
    color: colors.disableText,
  },

  clockIcon: {
    fontSize: normalize(20),
  },

  doneButton: {
    alignSelf: 'flex-end',
    padding: normalize(10),
  },

  doneText: {
    color: colors.primary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
  },

  frequencyRow: {
    flexDirection: 'row',
    gap: normalize(8),
  },

  frequencyButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.borderBG,
  },

  selectedFrequency: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  frequencyText: {
    fontSize: normalize(13),
    paddingVertical: normalize(15),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  selectedFrequencyText: {
    color: colors.textTertiary,
    fontFamily: 'Manrope-SemiBold',
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: normalize(12),
  },

  dayButton: {
    width: normalize(37),
    height: normalize(37),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(44),
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedDay: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  body: {
    flex: 1,
    backgroundColor: colors.textTertiary,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    marginTop: -normalize(30),
    overflow: 'hidden',
  },

  dayText: {
    color: colors.textSecondary,
    fontSize: normalize(13),
    fontFamily: 'Manrope-SemiBold',
  },

  selectedDayText: {
    color: colors.textTertiary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
  },

  footer: {
    paddingHorizontal: normalize(24),
    backgroundColor: colors.textTertiary,
  },

  submitButton: {
    // height: normalize(52),
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitText: {
    color: colors.textTertiary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    paddingVertical: normalize(18),
  },

  deleteContent: {
    paddingHorizontal: normalize(24),
    alignItems: 'center',
  },

  deleteIcon: {
    width: normalize(88),
    height: normalize(88),
    resizeMode: 'contain',
    marginBottom: normalize(16),
  },

  deleteTitle: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(8),
  },

  deleteDescription: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: normalize(32),
  },

  deleteButtons: {
    flexDirection: 'row',
    gap: normalize(12),
  },

  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border4,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: colors.textSecondary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
  },

  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmText: {
    color: colors.textTertiary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    paddingVertical: normalize(18),
  },
});

export default styles;
