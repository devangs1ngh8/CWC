import { StyleSheet } from 'react-native';

import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.17,
  },

  headerTitle: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textTertiary,
  },

  body: {
    flex: 1,
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
  },

  scrollContent: {
    flex: 1,
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(32),
  },

  menuCard: {
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(24),
    padding: normalize(20),
  },

  menuItem: {
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  lastMenuItem: {
    borderBottomWidth: 0,
  },

  menuIcon: {
    width: normalize(20),
    height: normalize(20),
    marginRight: normalize(12),
  },

  menuTitle: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  arrowIcon: {
    width: normalize(20),
    height: normalize(20),
  },
});

export default styles;
