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
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    borderTopLeftRadius: normalize(50),
    borderTopRightRadius: normalize(50),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(32),
  },

  content: {
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(14),
    lineHeight: normalize(23),
    color: colors.textSecondary,
  },
});

export default styles;
