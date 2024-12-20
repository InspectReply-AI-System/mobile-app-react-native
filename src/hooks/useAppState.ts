import { useRef, useEffect, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type AppStateCallbacks = {
  onActive?: () => void | Promise<void>;
  onBackground?: () => void | Promise<void>;
};

const useAppState = (callbacks: AppStateCallbacks) => {
  const appState = useRef(AppState.currentState);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground
        await callbacks.onActive?.();
      } else if (nextAppState.match(/inactive|background/)) {
        // App has gone to the background
        await callbacks.onBackground?.();
      }
      appState.current = nextAppState;
    },
    [callbacks],
  );

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  return null;
};

export default useAppState;
