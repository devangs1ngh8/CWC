import { image } from '../../assets';
import { ScreenName } from '../../navigation/screenName';

export const moreData = [
  {
    id: '1',
    titleKey: 'more.mySubscription',
    icon: image.mySubscription,
  },
  {
    id: '2',
    titleKey: 'more.manageGoals',
    icon: image.manageGoals,
    screenName: ScreenName.ManageGoals,
  },
  {
    id: '3',
    titleKey: 'more.reminders',
    icon: image.reminders,
    screenName: ScreenName.Reminders,
  },
  {
    id: '4',
    titleKey: 'more.trackingPreference',
    icon: image.trackingPreference,
    screenName: ScreenName.TrackingPreferences,
  },
  {
    id: '5',
    titleKey: 'more.languagePreference',
    icon: image.languagePreference,
    screenName: ScreenName.LanguagePreferences,
  },
  {
    id: '6',
    titleKey: 'more.notificationSettings',
    icon: image.notificationSettings,
    screenName: ScreenName.NotificationSettings,
  },
  {
    id: '7',
    titleKey: 'more.staticContent',
    icon: image.staticContent,
    screenName: ScreenName.StaticContent,
  },
  {
    id: '8',
    titleKey: 'more.helpSupport',
    icon: image.helpSupport,
    screenName: ScreenName.HelpSupport,
  },
  {
    id: '9',
    titleKey: 'more.changePassword',
    icon: image.changePassword,
    screenName: ScreenName.ChangePassword,
  },
  {
    id: '10',
    titleKey: 'more.logout',
    icon: image.logout,
  },
];
