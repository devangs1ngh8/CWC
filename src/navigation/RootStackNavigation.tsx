import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Language from '../screens/language';
import SpanishSplash from '../screens/spanishSplash';
import Onboarding from '../screens/onboarding';
import Login from '../screens/Login';

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  SpanishSplash: undefined;
  Onboarding: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="SpanishSplash" component={SpanishSplash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
