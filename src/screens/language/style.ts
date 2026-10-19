import { StyleSheet } from 'react-native';
import colors from '../../utils/color';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  options: {
    marginTop: normalize(4),
  },

  note: {
    color: colors.primary,
    fontSize: normalize(12),
    // marginTop: normalize(1),
    fontFamily: 'Manrope-Medium',
  },

  infoRow: {
    flexDirection: 'row',
    gap: normalize(6),
    marginLeft: normalize(12),
  },

  infoImage: {
    width: normalize(16),
    height: normalize(16),
    // marginTop: normalize(2),
  },

  secondaryHead: {
    color: colors.primary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },
});

export default styles;
