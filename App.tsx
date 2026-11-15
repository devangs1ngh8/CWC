import React, { useEffect } from 'react';
import './src/i18n';

import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './src/navigation/RootStackNavigation';
import Toast from 'react-native-toast-message';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/auth/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStackNavigation />
        </NavigationContainer>

        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
