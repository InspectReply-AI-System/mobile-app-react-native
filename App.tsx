import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from '@inspectreplyai/routes';
import { Provider } from 'react-redux';
import { store } from '@inspectreplyai/redux/Store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Navigator />
        </GestureHandlerRootView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
