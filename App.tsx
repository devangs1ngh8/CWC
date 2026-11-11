import React, { useEffect } from 'react';
import './src/i18n';

import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './src/navigation/RootStackNavigation';
import Toast from 'react-native-toast-message';

import { Provider } from 'react-redux';
import store from './src/redux/auth/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>

      <Toast />
    </Provider>
  );
};

export default App;
