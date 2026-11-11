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

  content: {
    flex: 1,
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingTop: normalize(12),
    paddingHorizontal: normalize(24),
  },

  dragHandle: {
    width: normalize(20),
    height: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(23),
  },

  mainContent: {
    flex: 1,
  },

  heading: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  headingHighlight: {
    color: colors.primary,
  },

  description: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    marginTop: normalize(4),
  },

  inputContainer: {
    marginTop: normalize(48),
  },

  bottomActions: {
    paddingBottom: normalize(34),
    gap: normalize(10),
  },

  cancelButton: {
    borderRadius: normalize(14),
    borderWidth: normalize(1),
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundBG2,
  },

  cancelButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.text11,
    paddingVertical: normalize(14),
  },

  applyButton: {
    borderRadius: normalize(14),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledApplyButton: {
    opacity: 0.55,
  },

  applyButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
    paddingVertical: normalize(14),
  },
});

export default styles;
