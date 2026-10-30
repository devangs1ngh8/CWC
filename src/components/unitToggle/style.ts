import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.buttonBG,
    borderRadius: normalize(8),
    marginTop: normalize(16),
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(8),
    paddingHorizontal: normalize(13),
    paddingVertical: normalize(8),
  },

  selectedButton: {
    backgroundColor: colors.background,
  },

  text: {
    color: colors.textSecondary,
    fontFamily: 'Manrope-Medium',
    fontSize: normalize(12),
  },

  selectedText: {
    color: colors.primary,
    fontFamily: 'Manrope-Bold',
  },
});

export default styles;
