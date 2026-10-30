import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textTertiary,
  },

  header: {
    // height: SCREEN_HEIGHT * 0.17,
  },

  headerTitle: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textTertiary,
  },

  content: {
    paddingHorizontal: normalize(24),
    paddingTop: normalize(32),
    paddingBottom: normalize(40),
  },

  learningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: normalize(20),
  },

  learningCard: {
    width: '48.5%',
  },

  learningTitle: {
    marginTop: normalize(8),
    fontSize: normalize(14),
    lineHeight: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  learningDescription: {
    marginTop: normalize(4),
    fontSize: normalize(12),
    lineHeight: normalize(19),
    fontFamily: 'Manrope-Medium',
    color: colors.text8,
  },
});

export default styles;
