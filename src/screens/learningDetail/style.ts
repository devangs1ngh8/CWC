import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  imageHeader: {
    height: SCREEN_HEIGHT * 0.3,
  },

  headerImage: {
    width: '100%',
    height: '100%',
  },

  backButton: {
    position: 'absolute',
    top: normalize(67),
    left: normalize(24),
  },

  backIcon: {
    width: normalize(40),
    height: normalize(40),
  },

  playButton: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.1,
    alignSelf: 'center',
  },

  playIcon: {
    width: normalize(50),
    height: normalize(50),
  },

  content: {
    flex: 1,
    marginTop: -normalize(20), // Didn't find any other way to do so, Sorry
    paddingTop: normalize(30),
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(24),
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
  },

  title: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(8),
  },

  description: {
    fontSize: normalize(14),
    lineHeight: normalize(22),
    fontFamily: 'Manrope-Regular',
    color: colors.text8,
  },

  videoContainer: {
    flex: 1,
    backgroundColor: colors.textPrimary,
  },

  video: {
    width: '100%',
    height: '100%',
  },

  videoBackButton: {
    position: 'absolute',
    top: normalize(20),
    left: normalize(20),
    zIndex: 2,
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
    backgroundColor: '#333333',
    borderRadius: normalize(8),
  },

  backText: {
    color: colors.textTertiary,
    fontSize: normalize(28),
  },
});

export default styles;
