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

  dragHandle: {
    width: normalize(20),
    height: normalize(5),
    borderRadius: normalize(10),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(14),
  },

  scrollContent: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(30),
  },

  heading: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(24),
    paddingRight: normalize(10),
  },

  headingPrimary: {
    color: colors.primary,
  },

  planCard: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(22),
    padding: normalize(20),
    marginBottom: normalize(20),
    backgroundColor: colors.textTertiary,
  },

  planTitle: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
    marginBottom: normalize(8),
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: normalize(12),
  },

  price: {
    fontSize: normalize(36),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  period: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Regular',
    color: colors.text10,
  },

  trialSection: {
    marginBottom: normalize(15),
  },

  trialHeading: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(12),
  },

  trialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(14),
    borderWidth: 1,
    borderColor: colors.border5,
    borderRadius: normalize(15),
    backgroundColor: colors.backgroundBG,
    padding: normalize(13),
  },

  giftIcon: {
    width: normalize(24),
    height: normalize(24),
  },

  trialCaption: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-SemiBold',
    color: colors.text8,
    marginBottom: normalize(5),
  },

  trialText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  trialHighlight: {
    color: colors.primary,
  },

  includedHeader: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  includedTitle: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  chevron: {
    width: normalize(24),
    height: normalize(24),
  },

  features: {
    paddingVertical: normalize(12),
    gap: normalize(12),
  },

  featureText: {
    fontSize: normalize(14),
    lineHeight: normalize(20),
    fontFamily: 'Manrope-Medium',
    color: colors.textSeven,
  },

  promoButton: {
    borderWidth: 1,
    borderColor: colors.border4,
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    alignItems: 'center',
    marginTop: normalize(16),
    marginBottom: normalize(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  voucher: {
    width: normalize(16),
    height: normalize(16),
    marginRight: normalize(8),
  },

  promoText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    paddingVertical: normalize(14),
    alignItems: 'center',
  },

  primaryButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },
});

export default styles;
