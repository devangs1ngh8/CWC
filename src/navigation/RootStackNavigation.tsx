import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Language from '../screens/language';
import Onboarding from '../screens/onboarding';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
  SpanishSplash: undefined;
  Onboarding: undefined;
  Login: undefined;
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
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
