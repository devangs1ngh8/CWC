import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  card: {
    width: normalize(80),
    // height: normalize(91),
    borderRadius: normalize(15),
    borderWidth: normalize(1),
    borderColor: colors.border,
    backgroundColor: colors.textTertiary,
    alignItems: 'center',
    gap: normalize(10),
    padding: normalize(8),
    marginBottom: normalize(12),
  },

  image: {
    width: normalize(64),
    height: normalize(43),
    borderRadius: normalize(8),
  },

  title: {
    fontSize: normalize(10),
    fontFamily: 'Manrope-Bold',
    color: colors.bleedingSubtitle,
    textAlign: 'center',
    marginBottom: normalize(8),
  },
});

export default styles;
