export const lactatingOptions = ['cycles.options.yes', 'cycles.options.no'];

export const contraceptiveOptions = [
  'cycles.options.oralContraceptive',
  'cycles.options.copperIud',
  'cycles.options.nonCopper',
  'cycles.options.injectable',
  'cycles.options.implant',
  'cycles.options.none',
];

export const bleedTimelineOptions = [
  'cycles.options.lessThan3Days',
  'cycles.options.threeToFiveDays',
  'cycles.options.sixToSevenDays',
  'cycles.options.moreThan7Days',
];

export const cycleLengthOptions = Array.from({ length: 23 }, (_, index) =>
  String(index + 18),
);

export const getTranslatedOptions = (
  options: string[],
  t: (key: string) => string,
) => options.map(option => t(option));
