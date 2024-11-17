import analytics from '@react-native-firebase/analytics';

const FirebaseLogger = {
  logEvent: (name: string, params: Record<string, any> = {}) => {
    console.log('(FirebaseLogger) Logging event:', name, params);
    try {
      analytics().logEvent(name, params);
    } catch (error) {
      console.error(`(FirebaseLogger) Failed to log event "${name}": ${error}`);
    }
  },

  recordScreen: (screenName: string) => {
    try {
      analytics().logScreenView({
        screen_class: screenName,
        screen_name: screenName,
      });
    } catch (error) {
      console.error(
        `(FirebaseLogger) Failed to record screen "${screenName}": ${error}`,
      );
    }
  },

  setUserProperties: (properties: Record<string, any> = {}) => {
    try {
      analytics().setUserProperties(properties);
    } catch (error) {
      console.error(`(FirebaseLogger) Failed to set user properties: ${error}`);
    }
  },
};

export default FirebaseLogger;
