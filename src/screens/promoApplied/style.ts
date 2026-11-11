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
  },

  successContent: {
    alignItems: 'center',
    paddingHorizontal: normalize(12),
    marginTop: normalize(23),
  },

  successIcon: {
    width: normalize(72),
    height: normalize(72),
  },

  heading: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginTop: normalize(20),
  },

  bonusBadge: {
    backgroundColor: colors.backgroundBG10,
    borderRadius: normalize(100),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
    marginTop: normalize(14),
  },

  bonusText: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Bold',
    color: colors.promoText,
  },

  description: {
    fontSize: normalize(15),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: normalize(24),
    marginTop: normalize(20),
  },

  bottomActions: {
    paddingBottom: normalize(34),
    marginTop: 'auto',
  },

  doneButton: {
    borderRadius: normalize(14),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  doneButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
    paddingVertical: normalize(14),
  },
});

export default styles;
