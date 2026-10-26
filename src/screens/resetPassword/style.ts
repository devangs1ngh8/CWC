import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    height: SCREEN_HEIGHT * 0.3,
  },

  secondaryTitleStyle: {
    color: colors.primary,
  },

  warningContainer: {
    borderWidth: normalize(1),
    borderRadius: normalize(14),
    borderColor: colors.primary,
    flexDirection: 'row',
    paddingHorizontal: normalize(16),
    backgroundColor: colors.primaryLight,
  },

  warningImg: {
    width: normalize(20),
    height: normalize(20),
    marginVertical: normalize(16),
    marginRight: normalize(8),
  },

  warningText: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    fontWeight: 400,
    lineHeight: normalize(16),
    paddingVertical: normalize(16),
    paddingRight: normalize(16),
  },
});

export default styles;
