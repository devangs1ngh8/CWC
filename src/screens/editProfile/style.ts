import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    position: 'relative',
  },

  profileImageContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.17,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },

  header: {
    height: SCREEN_HEIGHT * 0.235,
    backgroundColor: colors.primary,
  },

  body: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.textTertiary,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
  },

  profileImage: {
    width: SCREEN_WIDTH * 0.27,
    height: SCREEN_HEIGHT * 0.125,
    borderRadius: normalize(22),
    borderWidth: 2,
    borderColor: colors.textTertiary,
  },

  profileTop: {
    paddingHorizontal: normalize(24),
    paddingTop: SCREEN_HEIGHT * 0.08,
    paddingBottom: normalize(12),
    backgroundColor: colors.textTertiary,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    zIndex: 1,
  },

  changePhotoButton: {
    paddingVertical: normalize(18),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: normalize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
  },

  smallIcon: {
    width: normalize(20),
    height: normalize(20),
    marginRight: normalize(8),
  },

  changePhotoText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.primary,
  },

  form: {
    flex: 1,
    minHeight: 0,
  },

  scrollContent: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(20),
  },

  label: {
    marginTop: normalize(18),
    marginBottom: normalize(8),
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  input: {
    paddingVertical: normalize(18),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
    backgroundColor: colors.textTertiary,
  },

  disabledInput: {
    backgroundColor: colors.backgroundBG3,
    borderColor: colors.borderColor,
  },

  measureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },

  measureInput: {
    flex: 1,
  },

  unitGroup: {
    height: normalize(54),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(14),
    padding: normalize(3),
  },

  unitButton: {
    paddingHorizontal: normalize(17),
    paddingVertical: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(14),
  },

  selectedUnit: {
    backgroundColor: colors.primary,
  },

  unitText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textSeven,
  },

  selectedUnitText: {
    color: colors.textTertiary,
    fontFamily: 'Manrope-Bold',
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: normalize(55),
    borderWidth: normalize(1),
    borderColor: colors.border,
    borderRadius: normalize(14),
    backgroundColor: colors.textTertiary,
    paddingHorizontal: normalize(16),
  },

  countryCode: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
    paddingRight: normalize(10),
  },

  phoneDivider: {
    width: normalize(1),
    height: normalize(38),
    backgroundColor: colors.border,
  },

  phoneTextInput: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
    paddingLeft: normalize(10),
  },

  inputError: {
    borderColor: colors.error,
  },

  errorText: {
    color: colors.error,
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    marginTop: normalize(5),
  },

  deleteButton: {
    flexDirection: 'row',
    gap: normalize(8),
    marginTop: normalize(30),
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    paddingVertical: normalize(14),
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.error,
  },

  bottomButton: {
    paddingHorizontal: normalize(24),
    paddingTop: normalize(12),
    backgroundColor: colors.textTertiary,
  },

  photoOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(23),
    gap: normalize(12),
  },

  optionIcon: {
    width: normalize(24),
    height: normalize(24),
  },

  optionText: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textPrimary,
  },

  deleteContent: {
    alignItems: 'center',
    paddingHorizontal: normalize(28),
  },

  deleteIcon: {
    width: normalize(88),
    height: normalize(88),
    marginTop: normalize(27),
  },

  deleteModalTitle: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: normalize(8),
    marginTop: normalize(16),
  },

  deleteModalDescription: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    lineHeight: normalize(20),
    textAlign: 'center',
  },

  deleteModalButtons: {
    flexDirection: 'row',
    gap: normalize(16),
    marginTop: normalize(32),
  },

  cancelDeleteButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor2,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelDeleteText: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
  },

  confirmDeleteButton: {
    flex: 1,
    paddingVertical: normalize(18),
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmDeleteText: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },
});

export default styles;
