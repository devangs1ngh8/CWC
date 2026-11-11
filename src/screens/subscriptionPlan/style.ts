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
  },

  fixedHeader: {
    paddingHorizontal: normalize(24),
  },

  mainScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: normalize(24),
    paddingTop: normalize(5),
    paddingBottom: normalize(20),
  },

  bottomActions: {
    paddingHorizontal: normalize(24),
    // paddingTop: normalize(10),
    paddingBottom: normalize(20),
    backgroundColor: colors.backgroundBG2,
  },

  promoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(8),
    borderWidth: 1,
    borderColor: colors.border4,
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    marginBottom: normalize(10),
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    alignItems: 'center',
  },

  dragHandle: {
    width: normalize(20),
    height: normalize(5),
    borderRadius: normalize(30),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(14),
  },

  heading: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(16),
    lineHeight: normalize(33),
    paddingRight: normalize(10),
  },

  headingPrimary: {
    color: colors.primary,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundBG9,
    borderRadius: normalize(100),
    padding: normalize(4),
    marginBottom: normalize(20),
  },

  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(12),
    borderRadius: normalize(25),
  },

  activeToggleButton: {
    backgroundColor: colors.primary,
    elevation: 3,
  },

  toggleText: {
    fontSize: normalize(15),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
  },

  activeToggleText: {
    color: colors.textTertiary,
    fontFamily: 'Manrope-Bold',
  },

  selectedPlanCard: {
    borderWidth: normalize(1.5),
    borderColor: colors.primary,
    borderRadius: normalize(16),
    backgroundColor: colors.backgroundBG,
    padding: normalize(20),
    marginBottom: normalize(20),
  },

  selectedPlanTitle: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
  },

  selectedPlanPrice: {
    position: 'absolute',
    right: normalize(20),
    top: normalize(22),
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  selectedPrice: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  selectedPeriod: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  trialBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundBG10,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    borderRadius: normalize(6),
    marginTop: normalize(12),
  },

  trialBadgeText: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-SemiBold',
    color: colors.success,
  },

  featuresHeading: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Bold',
    color: colors.text8,
    marginBottom: normalize(10),
  },

  featuresContainer: {
    gap: normalize(12),
    marginBottom: normalize(28),
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
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

  voucher: {
    width: normalize(17),
    height: normalize(17),
  },

  promoText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.primary,
  },

  primaryButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },
});

export default styles;
