import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(50),
  },

  scrollContent: {
    paddingBottom: normalize(24),
  },

  version: {
    position: 'absolute',
    top: normalize(59),
    right: normalize(24),
    fontSize: normalize(12),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.19,
  },

  profileImage: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_HEIGHT * 0.11,
    borderRadius: normalize(22),
    borderWidth: normalize(2),
    borderColor: colors.textTertiary,
    top: SCREEN_HEIGHT * 0.135,
    alignSelf: 'center',
  },

  profileSection: {
    alignItems: 'center',
    paddingHorizontal: normalize(24),
    paddingTop: normalize(55),
  },

  profileName: {
    marginTop: normalize(8),
    fontSize: normalize(22),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  profileEmail: {
    marginTop: normalize(4),
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
  },

  editButton: {
    width: '100%',
    paddingVertical: normalize(14),
    marginTop: normalize(16),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: normalize(20),
  },

  editButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.primary,
  },

  editButtonView: {
    flexDirection: 'row',
    gap: normalize(8),
  },

  pencilImg: {
    width: normalize(20),
    height: normalize(20),
  },

  menuCard: {
    marginHorizontal: normalize(24),
    padding: normalize(20),
    backgroundColor: colors.textTertiary,
    borderRadius: normalize(24),
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: normalize(10),
    gap: normalize(8),
  },

  menuItem: {
    paddingVertical: normalize(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: normalize(1),
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
    color: colors.textSecondary,
  },

  arrowIcon: {
    width: normalize(20),
    height: normalize(20),
  },

  logoutContent: {
    alignItems: 'center',
    paddingHorizontal: normalize(24),
  },

  logoutModalIcon: {
    width: normalize(88),
    height: normalize(88),
    marginTop: normalize(19),
  },

  logoutModalTitle: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: normalize(8),
    marginTop: normalize(16),
  },

  logoutModalDescription: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
    color: colors.textSecondary,
    lineHeight: normalize(20),
    textAlign: 'center',
  },

  logoutModalButtons: {
    flexDirection: 'row',
    gap: normalize(16),
    marginTop: normalize(32),
  },

  cancelLogoutButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor2,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelLogoutText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textSecondary,
  },

  confirmLogoutButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmLogoutText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
    paddingVertical: normalize(18),
  },
});

export default styles;
