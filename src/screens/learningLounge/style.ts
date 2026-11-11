import { StyleSheet } from 'react-native';

import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/metrics';
import colors from '../../utils/color';

const CARD_GAP = normalize(12);
const HORIZONTAL_PADDING = normalize(24);
const CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_GAP) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  // Header
  header: {
    height: SCREEN_HEIGHT * 0.19,
  },

  headerTitle: {
    fontSize: normalize(22),
    fontFamily: 'Manrope-Bold',
    color: colors.textTertiary,
  },

  // Scrollable content
  scrollView: {
    flex: 1,
    marginTop: -normalize(20),
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    backgroundColor: colors.backgroundBG2,
  },

  content: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: normalize(30),
    paddingBottom: normalize(30),
  },

  // Two-column grid
  learningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  learningCard: {
    width: CARD_WIDTH,
    marginBottom: normalize(18),
  },

  learningImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.15,
    borderRadius: normalize(20),
    marginBottom: normalize(8),
  },

  learningTitle: {
    fontSize: normalize(14),
    lineHeight: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    marginBottom: normalize(4),
  },

  learningDescription: {
    fontSize: normalize(12),
    lineHeight: normalize(17),
    fontFamily: 'Manrope-Regular',
    color: colors.text8,
  },

  // Learning Detail screen styles - retained
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
