import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  // Header
  header: {
    height: SCREEN_HEIGHT * 0.45,
    backgroundColor: colors.primary,
    // position: 'relative',
    // overflow: 'hidden',
  },

  headerSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'transparent',
  },

  headerWoman: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.4,
    alignSelf: 'center',
    top: SCREEN_HEIGHT * 0.12,
  },

  content: {
    flex: 1,
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingTop: normalize(40),
    paddingHorizontal: normalize(24),
  },

  mainScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: normalize(25),
  },

  subscriptionCard: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: normalize(22),
    padding: normalize(20),
  },

  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: normalize(8),
  },

  planTitle: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
  },

  expiryBadge: {
    backgroundColor: colors.subsValidBG,
    paddingHorizontal: normalize(6),
    paddingVertical: normalize(3),
    borderRadius: normalize(5),
  },

  expiryText: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: normalize(12),
  },

  price: {
    fontSize: normalize(36),
    fontFamily: 'Manrope-Bold',
    color: colors.textBlack,
  },

  period: {
    fontSize: normalize(16),
    color: colors.textSecondary,
    marginLeft: normalize(2),
    fontFamily: 'Manrope-Regular',
  },

  sectionTitle: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Bold',
    color: colors.textBlack,
    marginTop: normalize(24),
    marginBottom: normalize(12),
  },

  trialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundBG12,
    borderWidth: 1,
    borderColor: colors.border7,
    borderRadius: normalize(17),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
  },

  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundBG13,
    borderWidth: 1,
    borderColor: colors.border8,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(10),
  },

  accessIcon: {
    width: normalize(24),
    height: normalize(24),
    marginRight: normalize(15),
  },

  accessDetails: {
    flex: 1,
    gap: normalize(10),
  },

  accessSubtitle: {
    fontSize: normalize(12),
    color: colors.textSecondary,
    fontFamily: 'Manrope-SemiBold',
  },

  accessTitle: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Bold',
    color: colors.textBlack,
  },

  purpleText: {
    color: colors.primary,
  },

  plusSign: {
    fontSize: normalize(27),
    fontFamily: 'Manrope-Bold',
    color: colors.textBlack,
    textAlign: 'center',
    marginVertical: normalize(3),
  },

  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: normalize(20),
  },

  includedHeading: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Bold',
    color: colors.textBlack,
    marginBottom: normalize(12),
  },

  featuresContainer: {
    gap: normalize(12),
  },

  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: normalize(5),
  },

  bullet: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
    marginRight: normalize(10),
    lineHeight: normalize(20),
  },

  featureText: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    lineHeight: normalize(20),
    color: colors.textSecondary,
  },

  cancelButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(20),
  },

  cancelButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.primary,
    paddingVertical: normalize(14),
  },
});

export default styles;
