import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  dragHandle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: normalize(5),
    marginVertical: normalize(13),
  },

  dot: {
    width: normalize(10),
    height: normalize(5),
    borderRadius: normalize(30),
    backgroundColor: colors.primaryLight,
  },

  activeDot: {
    width: normalize(20),
    backgroundColor: colors.primary,
  },
});

export default styles;
