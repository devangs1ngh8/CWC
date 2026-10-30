import React, { useEffect } from 'react';
import './src/i18n';

import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './src/navigation/RootStackNavigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>

      <Toast />
    </>
  );
};

export default App;
