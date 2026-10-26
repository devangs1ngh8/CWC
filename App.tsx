import React, { useEffect } from 'react';
import './src/i18n';

import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigation from './src/navigation/RootStackNavigation';
import { getValues } from './src/utils/commonFunctions';

const App = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default App;
