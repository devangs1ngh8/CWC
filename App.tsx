import React from 'react';
import './src/i18n';

import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './src/navigation/RootStackNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default App;
