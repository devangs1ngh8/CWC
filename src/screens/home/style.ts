import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.18,
    paddingHorizontal: normalize(20),
    backgroundColor: colors.primary,
  },

  headerBackground: {
    position: 'absolute',
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText: {
    flex: 1,
  },

  headerTitle: {
    fontSize: normalize(24),
    fontFamily: 'Manrope-Bold',
    color: colors.textTertiary,
  },

  headerSubtitle: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Regular',
    color: colors.textFifth,
    marginTop: normalize(8),
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(16),
  },

  iconImage: {
    width: normalize(40),
    height: normalize(40),
  },

  calendar: {
    paddingTop: normalize(32),
    // paddingBottom: normalize(32),
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(55),
    borderTopRightRadius: normalize(55),
  },

  weekRow: {
    flexDirection: 'row',
    gap: normalize(8),
    paddingHorizontal: normalize(1),
  },

  dateItem: {
    paddingHorizontal: normalize(4),
    paddingTop: normalize(10),
    paddingBottom: normalize(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundBG3,
    borderRadius: normalize(50),
    gap: normalize(10),
  },

  selectedDate: {
    backgroundColor: colors.textTertiary,
    borderWidth: normalize(1),
    borderColor: colors.primary,
  },

  disabledDate: {
    opacity: 0.4,
  },

  dayText: {
    fontSize: normalize(12),
    fontFamily: 'Manrope-Medium',
    color: colors.textSixth,
  },

  dateText: {
    width: normalize(44),
    lineHeight: normalize(49),
    textAlign: 'center',
    borderRadius: normalize(50),
    backgroundColor: colors.backgroundBG4,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSixth,
  },

  selectedDateText: {
    backgroundColor: colors.primary,
    color: colors.textTertiary,
  },

  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundBG6,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: normalize(30),
  },

  cycleSection: {
    // height: SCREEN_HEIGHT * 0.36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.textTertiary,
  },

  learningSection: {
    backgroundColor: colors.backgroundBG6,
    paddingTop: normalize(20),
    paddingBottom: normalize(26),
  },

  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: normalize(10),
    marginBottom: normalize(16),
  },

  sectionHeading: {
    fontSize: normalize(14),
    letterSpacing: normalize(2),
    fontFamily: 'Manrope-Bold',
    color: colors.textSeven,
  },

  learningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: normalize(12),
    rowGap: normalize(20),
    paddingHorizontal: normalize(24),
  },

  learningCard: {
    width: '48%',
  },

  learningImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.16,
    borderRadius: normalize(18),
  },

  learningTitle: {
    marginTop: normalize(8),
    fontSize: normalize(14),
    lineHeight: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
  },

  learningDescription: {
    // width: '100%',
    alignSelf: 'stretch',
    marginTop: normalize(4),
    fontSize: normalize(12),
    lineHeight: normalize(19),
    fontFamily: 'Manrope-Medium',
    color: colors.text8,
  },

  exploreButton: {
    alignSelf: 'center',
    marginTop: normalize(16),
    paddingVertical: normalize(14),
    borderWidth: normalize(1),
    borderColor: colors.borderColor2,
    borderRadius: normalize(14),
    backgroundColor: colors.textTertiary,
  },

  exploreButtonText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.exploreText,
    paddingHorizontal: normalize(52),
  },

  periodDueImage: {
    position: 'absolute',
    // height: SCREEN_HEIGHT * 0.295,
    // width: SCREEN_WIDTH * 0.65,
  },

  tunnelImg: {
    height: SCREEN_HEIGHT * 0.387,
    // backgroundColor: 'red',
  },
});

export default styles;
