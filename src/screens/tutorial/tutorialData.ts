import { image } from '../../assets';

export const getTutorialData = (t: (key: string) => string) => [
  {
    id: 1,
    image: image.Onboarding1,
    title: t('onboarding.slide1Title'),
    description: t('onboarding.slide1Description'),
  },
  {
    id: 2,
    image: image.Onboarding2,
    title: t('onboarding.slide2Title'),
    description: t('onboarding.slide2Description'),
  },
  {
    id: 3,
    image: image.Onboarding3,
    title: t('onboarding.slide3Title'),
    description: t('onboarding.slide3Description'),
  },
  {
    id: 4,
    image: image.Onboarding4,
    title: t('onboarding.slide4Title'),
    description: t('onboarding.slide4Description'),
  },
];
