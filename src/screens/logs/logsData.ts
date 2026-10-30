import { logsImages } from '../../assets';
import colors from '../../utils/color';

export const getLogsSections = (t: (key: string) => string) => [
  {
    title: t('logs.sections.bleeding'),
    key: 'bleeding',
    bg: colors.bleedingBG,
    selectedCard: colors.bleedingBorder,
    titleColor: colors.bleedingTitle,
    options: [
      { title: t('logs.bleeding.heavy'), source: logsImages.bleedingHeavy },
      { title: t('logs.bleeding.medium'), source: logsImages.bleedingMedium },
      { title: t('logs.bleeding.light'), source: logsImages.bleedingLight },
      {
        title: t('logs.bleeding.spotting'),
        source: logsImages.bleedingSpotting,
      },
      { title: t('logs.bleeding.brown'), source: logsImages.bleedingBrown },
    ],
  },

  {
    title: t('logs.sections.vulvalSensation'),
    key: 'sensation',
    bg: colors.sensationBG,
    selectedCard: colors.sensationCervicalBorder,
    titleColor: colors.sensationCervicalTitle,
    options: [
      { title: t('logs.vulvalSensation.dry'), source: logsImages.dry },
      { title: t('logs.vulvalSensation.sticky'), source: logsImages.sticky },
      { title: t('logs.vulvalSensation.moist'), source: logsImages.moist },
      { title: t('logs.vulvalSensation.wet'), source: logsImages.wet },
      {
        title: t('logs.vulvalSensation.slippery'),
        source: logsImages.slippery,
      },
    ],
  },

  {
    title: t('logs.sections.cervicalFluidColor'),
    key: 'cervicalColor',
    bg: colors.cervicalColor,
    selectedCard: colors.sensationCervicalBorder,
    titleColor: colors.sensationCervicalTitle,
    options: [
      { title: t('logs.cervicalFluidColor.white'), source: logsImages.white },
      { title: t('logs.cervicalFluidColor.yellow'), source: logsImages.yellow },
      {
        title: t('logs.cervicalFluidColor.streaked'),
        source: logsImages.streaked,
      },
      { title: t('logs.cervicalFluidColor.clear'), source: logsImages.clear },
      { title: t('logs.cervicalFluidColor.cloudy'), source: logsImages.cloudy },
      { title: t('logs.cervicalFluidColor.none'), source: logsImages.none },
    ],
  },

  {
    title: t('logs.sections.cervicalFluidObservation'),
    key: 'cervicalObservation',
    bg: colors.cervicalObservation,
    selectedCard: colors.sensationCervicalBorder,
    titleColor: colors.sensationCervicalTitle,
    options: [
      {
        title: t('logs.cervicalFluidObservation.thick'),
        source: logsImages.thick,
      },
      {
        title: t('logs.cervicalFluidObservation.thin'),
        source: logsImages.thin,
      },
      {
        title: t('logs.cervicalFluidObservation.watery'),
        source: logsImages.watery,
      },
      {
        title: t('logs.cervicalFluidObservation.lotion'),
        source: logsImages.lotion,
      },
      {
        title: t('logs.cervicalFluidObservation.pasty'),
        source: logsImages.pasty,
      },
      {
        title: t('logs.cervicalFluidObservation.stretchy'),
        source: logsImages.stretchy,
      },
      {
        title: t('logs.cervicalFluidObservation.none'),
        source: logsImages.none,
      },
    ],
  },

  {
    title: t('logs.sections.mood'),
    key: 'mood',
    bg: colors.moodBG,
    selectedCard: colors.moodBorder,
    titleColor: colors.moodTitle,
    options: [
      { title: t('logs.mood.happy'), source: logsImages.happy },
      { title: t('logs.mood.relaxed'), source: logsImages.relaxed },
      { title: t('logs.mood.anxious'), source: logsImages.anxious },
      { title: t('logs.mood.irritable'), source: logsImages.irritable },
      { title: t('logs.mood.tired'), source: logsImages.tired },
      { title: t('logs.mood.energetic'), source: logsImages.energetic },
      { title: t('logs.mood.noneYellow'), source: logsImages.noneYellow },
    ],
  },

  {
    title: t('logs.sections.symptoms'),
    key: 'symptoms',
    bg: colors.symptomsBG,
    selectedCard: colors.symptomsBorder,
    titleColor: colors.symptomsTitle,
    options: [
      {
        title: t('logs.symptoms.breastTenderness'),
        source: logsImages.breastTenderness,
      },
      { title: t('logs.symptoms.cramps'), source: logsImages.cramps },
      { title: t('logs.symptoms.bloating'), source: logsImages.bloating },
      { title: t('logs.symptoms.pain'), source: logsImages.pain },
      { title: t('logs.symptoms.acne'), source: logsImages.acne },
      { title: t('logs.symptoms.exercise'), source: logsImages.exercise },
      { title: t('logs.symptoms.sleep'), source: logsImages.sleep },
      { title: t('logs.symptoms.cravings'), source: logsImages.cravings },
      { title: t('logs.symptoms.blockGreen'), source: logsImages.blockGreen },
    ],
  },

  {
    title: t('logs.sections.sleepDisturbances'),
    key: 'sleep',
    bg: colors.sleepBG,
    selectedCard: colors.sleepBorder,
    titleColor: colors.sleepTitle,
    options: [
      {
        title: t('logs.sleep.troubleSleeping'),
        source: logsImages.troubleSleeping,
      },
      {
        title: t('logs.sleep.frequentWalking'),
        source: logsImages.frequentWalking,
      },
      {
        title: t('logs.sleep.restlessSleep'),
        source: logsImages.restlessSleep,
      },
      { title: t('logs.sleep.earlyWalking'), source: logsImages.earlyWalking },
      { title: t('logs.sleep.insomnia'), source: logsImages.insomnia },
      { title: t('logs.sleep.nightSweats'), source: logsImages.nightSweats },
      { title: t('logs.sleep.blockOrange'), source: logsImages.blockOrange },
    ],
  },
];

export const getDays = (t: (key: string) => string) => [
  { key: 'mon', label: t('logs.days.mon') },
  { key: 'tue', label: t('logs.days.tue') },
  { key: 'wed', label: t('logs.days.wed') },
  { key: 'thu', label: t('logs.days.thu') },
  { key: 'fri', label: t('logs.days.fri') },
  { key: 'sat', label: t('logs.days.sat') },
  { key: 'sun', label: t('logs.days.sun') },
];

export const hormonesData = [
  {
    key: 'lh',
    labelKey: 'logs.hormones.lh',
    unit: 'mIU/mL',
  },
  {
    key: 'fsh',
    labelKey: 'logs.hormones.fsh',
    unit: 'mIU/mL',
  },
  {
    key: 'estrogen',
    labelKey: 'logs.hormones.estrogen',
    unit: 'pg/mL',
  },
  {
    key: 'progesterone',
    labelKey: 'logs.hormones.progesterone',
    unit: 'ng/mL',
  },
] as const;

export type HormoneKey = (typeof hormonesData)[number]['key'];
