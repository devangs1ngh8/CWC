import { StyleSheet } from 'react-native';

import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
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
    paddingTop: normalize(24),
    paddingBottom: normalize(12),
  },

  scrollContent: {
    paddingBottom: normalize(20),
  },

  keyboardAvoidingStyle: {
    flex: 1,
  },

  contactHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(8),
  },

  headingText: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.textSecondary,
  },

  headingHighlight: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
    marginLeft: normalize(4),
  },

  subHeading: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    marginBottom: normalize(8),
  },

  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: normalize(20),
  },

  faqDescription: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
  },

  faqLink: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
    marginLeft: normalize(3),
  },

  emailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(24),
    padding: normalize(16),
    marginBottom: normalize(20),
    minHeight: normalize(76),
  },

  emailIcon: {
    width: normalize(44),
    height: normalize(44),
    marginRight: normalize(12),
  },

  emailContent: {
    flex: 1,
    justifyContent: 'center',
  },

  emailAddress: {
    fontSize: normalize(15),
    fontFamily: 'Manrope-Bold',
    color: colors.textSecondary,
  },

  emailSubtitle: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    marginTop: normalize(3),
  },

  categorySection: {
    marginBottom: normalize(20),
  },

  fieldLabel: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    marginBottom: normalize(7),
  },

  categoryDropdown: {
    height: normalize(48),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(15),
    backgroundColor: colors.textTertiary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(14),
  },

  categoryText: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  dropdownIcon: {
    width: normalize(16),
    height: normalize(16),
  },

  issueSection: {
    marginBottom: normalize(16),
  },

  issueDescription: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    lineHeight: normalize(18),
    marginBottom: normalize(8),
  },

  issueInput: {
    minHeight: normalize(116),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(15),
    backgroundColor: colors.textTertiary,
    padding: normalize(14),
    fontSize: normalize(13),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
  },

  sendButton: {
    height: normalize(50),
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(10),
  },

  disabledButton: {
    opacity: 0.5,
  },

  sendButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },

  sheetContent: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(24),
  },

  sheetTitle: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: normalize(18),
  },

  sheetOption: {
    paddingVertical: normalize(16),
  },

  sheetOptionText: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  selectedOption: {
    color: colors.primary,
    fontFamily: 'Manrope-Bold',
  },
});

export default styles;
