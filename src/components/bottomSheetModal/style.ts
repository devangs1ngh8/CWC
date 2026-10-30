import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },

  bottomSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(32),
    borderTopRightRadius: normalize(32),
    paddingTop: normalize(12),
    paddingBottom: normalize(30),
  },

  handle: {
    width: normalize(28),
    height: normalize(5),
    borderRadius: normalize(5),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(20),
  },
});

export default styles;
