import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from '@inspectreplyai/routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
};

export default App;
