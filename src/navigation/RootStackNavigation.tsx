import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Language from '../screens/language';
import Tutorial from '../screens/tutorial';
import Login from '../screens/login';
import ForgotPassword from '../screens/forgotPassword';
import SecurityPin from '../screens/securityPin';
import ResetPassword from '../screens/resetPassword';
import SignUp from '../screens/signUp';
import VerifyEmail from '../screens/verifyEmail';
import TermsConditions from '../screens/termsConditions';
import PrivacyPolicy from '../screens/privacyPolicy';
import PersonalInformation from '../screens/personalInformation';
import YourCycles from '../screens/yourCycles';
import CatholicCommunity from '../screens/catholicCommunity';
import BottomTabNavigator from './BottomTabNavigator';
import LearningDetail from '../screens/learningDetail';
import LearningLounge from '../screens/learningLounge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ScreenName } from './screenName';
import { LearningItem } from '../screens/home/learningData';
import EditProfile from '../screens/editProfile';
import More from '../screens/more';
import ManageGoals from '../screens/manageGoals';
import LanguagePreferences from '../screens/languagePreferences';
import NotificationSettings from '../screens/notificationSettings';
import TrackingPreferences from '../screens/trackingPreferences';
import ChangePassword from '../screens/changePassword';
import StaticContent from '../screens/staticContent';
import FAQs from '../screens/faqs';
import AboutUs from '../screens/aboutUs';
import HelpSupport from '../screens/helpSupport';
import Reminders from '../screens/reminders';

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  Tutorial: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SecurityPin: undefined;
  ResetPassword: undefined;
  SignUp: undefined;
  VerifyEmail: undefined;
  TermsConditions: undefined;
  PrivacyPolicy: undefined;
  PersonalInformation: undefined;
  YourCycles: undefined;
  CatholicCommunity: undefined;
  MainTabs: undefined;
  LearningDetail: { item: LearningItem };
  LearningLounge: undefined;
  EditProfile: undefined;
  More: undefined;
  ManageGoals: undefined;
  LanguagePreferences: undefined;
  NotificationSettings: undefined;
  TrackingPreferences: undefined;
  ChangePassword: undefined;
  StaticContent: undefined;
  FAQs: undefined;
  AboutUs: undefined;
  HelpSupport: undefined;
  Reminders: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  // useEffect(() => {
  //   const getLanguage = async () => {
  //     await AsyncStorage.clear();
  //   };
  //   getLanguage();
  // });
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ScreenName.Splash} component={Splash} />
      <Stack.Screen name={ScreenName.Language} component={Language} />
      <Stack.Screen name={ScreenName.Tutorial} component={Tutorial} />
      <Stack.Screen name={ScreenName.Login} component={Login} />
      <Stack.Screen
        name={ScreenName.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen name={ScreenName.SecurityPin} component={SecurityPin} />
      <Stack.Screen name={ScreenName.ResetPassword} component={ResetPassword} />
      <Stack.Screen name={ScreenName.SignUp} component={SignUp} />
      <Stack.Screen name={ScreenName.VerifyEmail} component={VerifyEmail} />
      <Stack.Screen
        name={ScreenName.TermsConditions}
        component={TermsConditions}
      />
      <Stack.Screen name={ScreenName.PrivacyPolicy} component={PrivacyPolicy} />
      <Stack.Screen
        name={ScreenName.PersonalInformation}
        component={PersonalInformation}
      />
      <Stack.Screen name={ScreenName.YourCycles} component={YourCycles} />
      <Stack.Screen
        name={ScreenName.CatholicCommunity}
        component={CatholicCommunity}
      />
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenName.LearningDetail}
        component={LearningDetail}
      />
      <Stack.Screen
        name={ScreenName.LearningLounge}
        component={LearningLounge}
      />
      <Stack.Screen name={ScreenName.EditProfile} component={EditProfile} />
      <Stack.Screen name={ScreenName.ManageGoals} component={ManageGoals} />

      <Stack.Screen
        name={ScreenName.LanguagePreferences}
        component={LanguagePreferences}
      />
      <Stack.Screen
        name={ScreenName.NotificationSettings}
        component={NotificationSettings}
      />

      <Stack.Screen
        name={ScreenName.TrackingPreferences}
        component={TrackingPreferences}
      />

      <Stack.Screen
        name={ScreenName.ChangePassword}
        component={ChangePassword}
      />
      <Stack.Screen name={ScreenName.StaticContent} component={StaticContent} />
      <Stack.Screen name={ScreenName.FAQs} component={FAQs} />
      <Stack.Screen name={ScreenName.AboutUs} component={AboutUs} />
      <Stack.Screen name={ScreenName.HelpSupport} component={HelpSupport} />
      <Stack.Screen name={ScreenName.Reminders} component={Reminders} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
