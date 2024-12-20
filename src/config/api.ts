import Config from 'react-native-config';

// src/config/api.js
const API_TIMEOUT = 5000;

export const apiConfig = {
  BASE_URL: Config.BASE_URL,
  TIMEOUT: API_TIMEOUT,
  // Add more API-related configurations if needed
};
