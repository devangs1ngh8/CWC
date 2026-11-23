import { StyleSheet } from 'react-native';

import colors from '../../utils/color';
import { normalize } from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(30),
    borderTopRightRadius: normalize(30),
  },

  keyboardContainer: {
    flex: 1,
    minHeight: 0,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  dragHandle: {
    width: normalize(20),
    height: normalize(5),
    backgroundColor: colors.primary,
    borderRadius: normalize(30),
    alignSelf: 'center',
    marginTop: normalize(12),
    marginBottom: normalize(23),
  },

  description: {
    marginTop: normalize(8),
    fontSize: normalize(14),
    lineHeight: normalize(20),
    textAlign: 'center',
    color: colors.textSecondary,
    fontFamily: 'Manrope-Medium',
    marginBottom: normalize(32),
    marginHorizontal: normalize(10),
  },

  titleContentStyle: {
    flexDirection: 'row',
    gap: normalize(4),
    alignSelf: 'center',
    alignItems: 'flex-start',
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
