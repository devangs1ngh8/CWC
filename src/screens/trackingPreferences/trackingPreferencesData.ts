import { image } from '../../assets';

export const trackingPreferencesData = [
  {
    key: 'urinaryHormone',
    titleKey: 'trackingPreferences.urinaryHormone',
    icon: image.search,
    children: [
      {
        key: 'fsh',
        titleKey: 'trackingPreferences.fsh',
        icon: image.testResult,
      },
      {
        key: 'lh',
        titleKey: 'trackingPreferences.lh',
        icon: image.testResult,
      },
      {
        key: 'estrogen',
        titleKey: 'trackingPreferences.estrogen',
        icon: image.testLevel,
      },
      {
        key: 'progesterone',
        titleKey: 'trackingPreferences.progesterone',
        icon: image.testLevel,
      },
    ],
  },
  {
    key: 'manageSymptoms',
    titleKey: 'trackingPreferences.manageSymptoms',
    icon: image.manageSymptoms,
    children: [],
  },
] as const;

export const hcpData = {
  key: 'hcp',
  titleKey: 'trackingPreferences.hcp',
  icon: image.insights2,
  children: [
    {
      key: 'email1',
      title: 'mavic.123@gmail.com',
    },
    {
      key: 'email2',
      title: 'allison.123@gmail.com',
    },
    {
      key: 'email3',
      title: 'deepanshusati.123@gmail.com',
    },
    {
      key: 'email4',
      title: 'shreyatomar.123@gmail.com',
    },
  ],
} as const;
