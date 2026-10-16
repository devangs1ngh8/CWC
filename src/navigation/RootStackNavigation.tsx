import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Language from '../screens/language';

export type RootStackParamList = {
  Splash: undefined;
  Language: undefined;
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
    </Stack.Navigator>
  );
};

export default RootStackNavigation;
