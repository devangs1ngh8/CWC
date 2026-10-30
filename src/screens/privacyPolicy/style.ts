import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.17,
  },

  headerTitle: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textTertiary,
  },

  body: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    overflow: 'hidden',
    paddingHorizontal: normalize(24),
    paddingTop: normalize(24),
  },

  intro: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    lineHeight: normalize(23),
    color: colors.textSecondary,
    marginBottom: normalize(24),
  },

  section: {
    marginBottom: normalize(28),
  },

  sectionTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(14),
    lineHeight: normalize(23),
    color: colors.textPrimary,
    marginBottom: normalize(2),
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: normalize(2),
  },

  bullet: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    lineHeight: normalize(23),
    color: colors.textSecondary,
    marginRight: normalize(8),
  },

  content: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    lineHeight: normalize(23),
    color: colors.textSecondary,
  },
});

export default styles;
