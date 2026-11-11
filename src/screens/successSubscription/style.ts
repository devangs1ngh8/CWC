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
    width: normalize(22),
    height: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(13),
  },

  mainScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: normalize(12),
  },

  heading: {
    fontSize: normalize(24),
    lineHeight: normalize(32),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    paddingRight: normalize(10),
  },

  headingPrimary: {
    color: colors.primary,
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundBG9,
    borderRadius: normalize(100),
    padding: normalize(4),
    marginTop: normalize(16),
  },

  toggleButton: {
    flex: 1,
    borderRadius: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeToggleButton: {
    backgroundColor: colors.primary,
  },

  toggleText: {
    fontSize: normalize(15),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
    paddingVertical: normalize(14),
  },

  activeToggleText: {
    color: colors.textTertiary,
    fontFamily: 'Manrope-Bold',
  },

  selectedPlanCard: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: normalize(16),
    marginTop: normalize(18),
    paddingHorizontal: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedPlanTitle: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
    paddingVertical: normalize(18),
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  selectedPrice: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  selectedPeriod: {
    fontSize: normalize(11),
    fontFamily: 'Manrope-Bold',
    color: colors.textSecondary,
  },

  freeAccessCard: {
    backgroundColor: colors.backgroundBG11,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(14),
    padding: normalize(16),
    marginTop: normalize(10),
  },

  freeAccessHeading: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(1),
  },

  accessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(8),
  },

  accessLabel: {
    flex: 1,
    fontSize: normalize(13),
    color: colors.textSecondary,
    fontFamily: 'Manrope-Medium',
  },

  trialBadge: {
    backgroundColor: colors.backgroundBG9,
    // paddingHorizontal: normalize(9),
    paddingVertical: normalize(5),
    borderRadius: normalize(4),
  },

  trialBadgeText: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textPrimary,
  },

  promoValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(6),
  },

  promoValue: {
    color: colors.promoText,
    backgroundColor: colors.promoBG,
    fontSize: normalize(12),
    fontFamily: 'Manrope-Bold',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
    borderRadius: normalize(4),
  },

  removePromo: {
    width: normalize(12),
    height: normalize(13),
  },

  featuresHeading: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Bold',
    color: colors.text12,
    marginTop: normalize(16),
    marginBottom: normalize(10),
  },

  featuresContainer: {
    gap: normalize(15),
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },

  checkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkMark: {
    width: normalize(20),
    height: normalize(20),
  },

  featureText: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  disclaimer: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    lineHeight: normalize(21),
    color: colors.text10,
    textAlign: 'center',
    marginTop: normalize(12),
    paddingHorizontal: normalize(4),
  },

  bottomActions: {
    paddingTop: normalize(10),
    paddingBottom: normalize(20),
    backgroundColor: colors.backgroundBG2,
  },

  primaryButton: {
    borderRadius: normalize(14),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    fontSize: normalize(15),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
    paddingVertical: normalize(14),
  },
});

export default styles;
