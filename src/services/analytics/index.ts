import FirebaseLogger from './firebase';
import { EVENTS } from './events';

const AnalyticsService = {
  logEvent: (name: string, params: Record<string, any> = {}) => {
    if (!name) {
      console.warn('(AnalyticsService) Event name is required');
      return;
    }
    FirebaseLogger.logEvent(name, params);
  },

  setUserAttributes: (attributes: Record<string, any> = {}) => {
    FirebaseLogger.setUserProperties(attributes);
  },

  logScreenView: (screenName: string, prevScreenName: string = '') => {
    if (!screenName) {
      console.warn('(AnalyticsService) Screen name is required');
      return;
    }
    AnalyticsService.logEvent(`${screenName.toLowerCase()}_screen_view`, {
      prev_screen_name: prevScreenName,
    });
    FirebaseLogger.recordScreen(screenName);
  },

  EVENTS,
};

export default AnalyticsService;
