import { CommonStrings } from '@inspectreplyai/utils';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const showErrorToast = (message: string) => {
  Toast.show({
    text1: CommonStrings.Error,
    text2: message,
    position: 'top',
    type: 'error',
    visibilityTime: 3000,
  });
};

export const showSuccessToast = (message: string, title = '') => {
  Toast.show({
    text1: title || CommonStrings.Success,
    text2: message,
    position: 'top',
    type: 'success',
    visibilityTime: 2000,
  });
};

export const showInfoToast = (message: string) => {
  Toast.show({
    text1: 'Info',
    text2: message,
    position: 'top',
    type: 'info',
    visibilityTime: 3000,
  });
};
