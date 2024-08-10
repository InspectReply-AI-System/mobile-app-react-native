import { Platform } from 'react-native';
import { isIphoneX as checkIfIphoneX } from 'react-native-iphone-x-helper';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const isIphoneX = checkIfIphoneX();

export { isIOS, isIphoneX, isAndroid };
