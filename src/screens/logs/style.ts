import { StyleSheet } from 'react-native';
import { normalize, SCREEN_HEIGHT } from '../../utils/metrics';
import colors from '../../utils/color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  header: {
    height: SCREEN_HEIGHT * 0.2,
    paddingTop: normalize(90),
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
    paddingBottom: normalize(32),
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
    backgroundColor: colors.textTertiary,
  },

  scrollContent: {
    paddingBottom: normalize(42),
  },

  temperatureSection: {
    backgroundColor: colors.temperatureBG,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(14),
    marginBottom: normalize(40),
  },

  simpleHeading: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: normalize(16),
  },

  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(12),
  },

  temperatureInputContainer: {
    flex: 1,
    paddingVertical: normalize(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    paddingHorizontal: normalize(16),
  },

  thermometerIcon: {
    width: normalize(20),
    height: normalize(20),
    marginRight: normalize(8),
  },

  temperatureInput: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  temperatureToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: normalize(14),
    padding: normalize(4),
  },

  unitButton: {
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(11),
  },

  activeUnitButton: {
    backgroundColor: colors.primary,
  },

  unitText: {
    color: colors.textSecondary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Regular',
  },

  activeUnitText: {
    color: colors.textTertiary,
    fontFamily: 'Manrope-SemiBold',
  },

  hormoneSection: {
    backgroundColor: colors.urinaryBg,
    borderTopLeftRadius: normalize(35),
    borderTopRightRadius: normalize(35),
    paddingTop: normalize(16),
    marginBottom: normalize(40),
    paddingHorizontal: normalize(24),
  },

  hormoneCard: {
    borderWidth: normalize(1),
    borderRadius: normalize(24),
    borderColor: colors.urinaryBorderColor,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(16),
    backgroundColor: colors.textTertiary,
  },

  hormoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  hormoneText: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  hormoneValue: {
    fontSize: normalize(16),
    fontFamily: 'Manrope-Bold',
    color: colors.textSecondary,
  },

  hormoneEdit: {
    width: normalize(20),
    height: normalize(20),
  },

  pencilRow: {
    flexDirection: 'row',
    gap: normalize(10),
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.backgroundDullColor,
  },

  hormoneModal: {
    backgroundColor: colors.backgroundBG2,
    borderTopLeftRadius: normalize(40),
    borderTopRightRadius: normalize(40),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(12),
    paddingBottom: normalize(45),
  },

  modalHandle: {
    width: normalize(20),
    height: normalize(5),
    borderRadius: normalize(30),
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: normalize(22),
  },

  titleRow: {
    flexDirection: 'row',
    gap: normalize(3),
    justifyContent: 'center',
  },

  titleOne: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: normalize(24),
  },

  titleTwo: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: normalize(24),
  },

  modalField: {
    marginBottom: normalize(32),
  },

  modalLabel: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
    marginBottom: normalize(8),
  },

  modalInputContainer: {
    paddingVertical: normalize(18),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: normalize(17),
    paddingHorizontal: normalize(14),
    backgroundColor: colors.textTertiary,
  },

  modalInput: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  modalUnit: {
    fontSize: normalize(14),
    fontFamily: 'Manrope-Medium',
    color: colors.textSecondary,
  },

  modalSaveButton: {
    paddingVertical: normalize(18),
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
  },

  modalSaveText: {
    color: colors.textTertiary,
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
  },

  medicationSection: {
    backgroundColor: colors.medicationBG,
    borderTopRightRadius: normalize(40),
    borderTopLeftRadius: normalize(40),
    paddingTop: normalize(16),
    paddingHorizontal: normalize(24),
    marginBottom: normalize(20),
  },

  medicationField: {
    marginBottom: normalize(20),
  },

  notesSection: {
    paddingHorizontal: normalize(26),
  },

  notesLabel: {
    color: colors.textSecondary,
    marginBottom: normalize(8),
  },

  notesInput: {
    borderWidth: normalize(1),
    borderRadius: normalize(14),
    borderColor: colors.border,
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(18),
    height: normalize(100),
  },

  limitIndicator: {
    color: colors.textSecondary,
    fontSize: normalize(12),
    fontFamily: 'Manrope-Medium',
    marginTop: normalize(8),
    alignSelf: 'flex-end',
    marginRight: normalize(2),
  },

  medicationModal: {
    backgroundColor: colors.backgroundBG2,
    borderTopRightRadius: normalize(40),
    borderTopLeftRadius: normalize(40),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(12),
    paddingBottom: normalize(30),
  },

  medicationInput: {
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(16),
    borderWidth: normalize(1),
    borderRadius: normalize(14),
    borderColor: colors.border,
    marginTop: normalize(8),
    color: 'colors.textSecondary',
  },

  dosageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },

  dosageInput: {
    flex: 1,
    borderWidth: normalize(1),
    borderRadius: normalize(14),
    borderColor: colors.border,
    paddingVertical: normalize(18),
    paddingHorizontal: normalize(16),
    marginTop: normalize(8),
  },

  unitContainer: {
    flexDirection: 'row',
    backgroundColor: colors.textTertiary,
    borderWidth: normalize(1),
    borderColor: colors.border,
    borderRadius: normalize(14),
    padding: normalize(4),
  },

  unitTexts: {
    paddingVertical: normalize(4),
  },

  timeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.textTertiary,
    gap: normalize(8),
    borderRadius: normalize(14),
  },

  timeButton: {
    flex: 1,
    backgroundColor: colors.textTertiary,
    paddingVertical: normalize(15),
    borderWidth: normalize(1),
    borderColor: colors.border,
    borderRadius: normalize(14),
    marginTop: normalize(8),
    alignSelf: 'center',
    alignItems: 'center',
  },

  activeTimeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  timeText: {
    fontSize: normalize(13),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  activeTimeText: {
    fontFamily: 'Manrope-SemiBold',
    color: colors.textTertiary,
  },

  medicationSaveButton: {
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    borderWidth: normalize(1),
  },

  medicationSaveText: {
    color: colors.textTertiary,
    alignSelf: 'center',
    paddingVertical: normalize(18),
    fontSize: normalize(14),
    fontFamily: 'Manrope-SemiBold',
  },

  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textTertiary,
    borderWidth: 1,
    borderColor: '#69B9E5',
    borderRadius: normalize(24),
    padding: normalize(18),
    marginBottom: normalize(16),
  },

  medicationCardIcon: {
    width: normalize(68),
    height: normalize(68),
    marginRight: normalize(16),
  },

  medicationCardContent: {
    flex: 1,
  },

  medicationCardName: {
    fontSize: normalize(18),
    color: colors.textPrimary,
    fontWeight: '600',
  },

  medicationCardDetails: {
    fontSize: normalize(15),
    color: colors.textSecondary,
    marginTop: normalize(8),
  },

  medicationDot: {
    color: colors.border,
  },

  medicationMore: {
    fontSize: normalize(28),
    color: colors.textPrimary,
    paddingHorizontal: normalize(6),
  },

  addMedicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(16),
    backgroundColor: colors.textTertiary,
    borderWidth: normalize(1),
    borderColor: colors.border3,
    borderRadius: normalize(16),
    marginTop: normalize(4),
  },

  addMedicationIcon: {
    width: normalize(42),
    height: normalize(42),
    borderRadius: normalize(10),
    backgroundColor: colors.backgroundBG8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(8),
  },

  addMedicationPlus: {
    fontSize: normalize(34),
    color: colors.textTertiary,
    lineHeight: normalize(38),
  },

  addMedicationText: {
    fontSize: normalize(16),
    color: colors.textPrimary,
    fontFamily: 'Manrope-Medium',
  },

  medicationOptionsModal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.textTertiary,
    borderTopLeftRadius: normalize(40),
    borderTopRightRadius: normalize(40),
    paddingTop: normalize(12),
    paddingBottom: normalize(50),
  },

  medicationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(32),
    paddingVertical: normalize(20),
    gap: normalize(20),
  },

  medicationOptionIcon: {
    width: normalize(25),
    height: normalize(25),
  },

  medicationOptionText: {
    fontSize: normalize(18),
    fontFamily: 'Manrope-Medium',
    color: colors.textPrimary,
  },

  deleteMedicationModal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.textTertiary,
    borderTopLeftRadius: normalize(40),
    borderTopRightRadius: normalize(40),
    paddingHorizontal: normalize(24),
    paddingTop: normalize(24),
    paddingBottom: normalize(50),
    alignItems: 'center',
  },

  deleteMedicationIcon: {
    width: normalize(100),
    height: normalize(100),
    marginVertical: normalize(20),
  },

  deleteMedicationTitle: {
    fontSize: normalize(20),
    fontFamily: 'Manrope-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: normalize(35),
  },

  deleteMedicationButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: normalize(14),
  },

  deleteMedicationCancel: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border4,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(18),
  },

  deleteMedicationCancelText: {
    color: colors.textSecondary,
    fontSize: normalize(15),
    fontFamily: 'Manrope-SemiBold',
  },

  deleteMedicationConfirm: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: normalize(14),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: normalize(18),
  },

  deleteMedicationConfirmText: {
    color: colors.textTertiary,
    fontSize: normalize(15),
    fontFamily: 'Manrope-SemiBold',
  },
});

export default styles;
