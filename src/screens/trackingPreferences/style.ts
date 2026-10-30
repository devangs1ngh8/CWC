import { StyleSheet } from 'react-native';
import { normalize } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  body: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(32),
  },

  scrollContent: {
    paddingBottom: normalize(24),
    gap: normalize(12),
  },

  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(24),
    padding: normalize(20),
    backgroundColor: colors.textTertiary,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    paddingVertical: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  childRow: {
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: normalize(32),
    gap: normalize(12),
  },

  child2Row: {
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  childDivider: {
    // height: normalize(1),
    borderBottomWidth: normalize(1),
    marginLeft: normalize(32),
    borderColor: colors.border,
  },

  lastRow: {
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderColor: colors.border,
  },

  lastRow2: {
    borderBottomWidth: 0,
  },

  icon: {
    width: normalize(20),
    height: normalize(20),
  },

  rowTitle: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  childTitle: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  emailTitle: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
  },
});

export default styles;
