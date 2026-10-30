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
    paddingTop: normalize(32),
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(20),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(24),
    backgroundColor: colors.textTertiary,
    gap: normalize(12),
  },
  notificationIcon: {
    width: normalize(20),
    height: normalize(20),
  },
  notificationTextContainer: {
    flex: 1,
    gap: normalize(4),
  },
  notificationTitle: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },
  notificationDescription: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
  },
});

export default styles;
