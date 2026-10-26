import { StyleSheet } from 'react-native';
import colors from '../../utils/color';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  headerStyle: {
    height: SCREEN_HEIGHT * 0.65,
  },

  headingStyle: {
    paddingHorizontal: normalize(10),
  },

  body: {
    flex: 1,
  },

  skipButton: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.082,
    right: normalize(24),
    padding: normalize(8),
  },

  skipImage: {
    width: normalize(53),
    height: normalize(20),
  },

  slide: {
    flex: 1,
  },
});

export default styles;
