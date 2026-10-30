import { image } from '../../assets';
import { ScreenName } from '../../navigation/screenName';

export const staticContentData = [
  {
    id: '1',
    titleKey: 'staticContent.faqs',
    icon: image.faq,
    screenName: 'FAQs',
  },
  {
    id: '2',
    titleKey: 'staticContent.terms',
    icon: image.terms,
    screenName: ScreenName.TermsConditions,
  },
  {
    id: '3',
    titleKey: 'staticContent.privacy',
    icon: image.terms,
    screenName: ScreenName.PrivacyPolicy,
  },
  {
    id: '4',
    titleKey: 'staticContent.about',
    icon: image.about,
    screenName: ScreenName.AboutUs,
  },
];
