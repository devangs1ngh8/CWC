import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Language from '../screens/language';
import Tutorial from '../screens/tutorial';
import Login from '../screens/Login';
import ForgotPassword from '../screens/forgotPassword';
import SecurityPin from '../screens/securityPin';
import ResetPassword from '../screens/resetPassword';
import Logs from '../screens/logs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { ScreenName } from './screenName';

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  Tutorial: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  SecurityPin: undefined;
  ResetPassword: undefined;
  Logs: undefined;
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
      <Stack.Screen name={ScreenName.Logs} component={Logs} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
