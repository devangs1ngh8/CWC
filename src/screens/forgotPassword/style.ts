import { StyleSheet } from 'react-native';
import { SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },

  primaryTextStyle: {
    color: colors.primary,
  },
});

export default styles;
