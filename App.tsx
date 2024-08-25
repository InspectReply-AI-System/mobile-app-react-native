import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from '@inspectreplyai/routes';
import { Provider } from 'react-redux';
import { store } from '@inspectreplyai/redux/Store';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
