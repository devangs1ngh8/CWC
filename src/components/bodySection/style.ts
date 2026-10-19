import { StyleSheet } from 'react-native';

import colors from '../../utils/color';
import { normalize } from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
    paddingBottom: normalize(20),
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(30),
    borderTopRightRadius: normalize(30),
  },

  dragHandle: {
    width: normalize(20),
    height: normalize(5),
    backgroundColor: colors.primary,
    borderRadius: normalize(30),
    alignSelf: 'center',
    marginTop: normalize(12),
    marginBottom: normalize(31),
  },

  description: {
    marginTop: normalize(8),
    fontSize: normalize(14),
    lineHeight: normalize(20),
    textAlign: 'center',
    color: colors.textSecondary,
    fontFamily: 'Manrope-Medium',
    marginBottom: normalize(30),
    marginHorizontal: normalize(10),
  },

  titleContentStyle: {
    flexDirection: 'row',
    gap: normalize(4),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titlePrimaryStyle: {
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(21),
    textAlign: 'center',
  },

  titleSecondaryStyle: {
    fontFamily: 'Manrope-Bold',
    fontSize: normalize(21),
  },
});

export default styles;
