import { image } from '../../assets';

export const goalsData = [
  {
    key: 'periodPredictions',
    titleKey: 'manageGoals.periodPredictions',
    icon: image.periodPrediction,
    disabled: true,
  },
  {
    key: 'periodNotifications',
    titleKey: 'manageGoals.periodNotifications',
    icon: image.reminders,
    disabled: false,
  },
  {
    key: 'fertilityEstimation',
    titleKey: 'manageGoals.fertilityEstimation',
    icon: image.fertilityStatus,
    disabled: false,
  },
  {
    key: 'fertilityNotifications',
    titleKey: 'manageGoals.fertilityNotifications',
    icon: image.reminders,
    disabled: false,
  },
] as const;
