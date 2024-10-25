import { Platform, Keyboard, UIManager, LayoutAnimation } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { getUniqueId } from 'react-native-device-info';
import moment from 'moment';
import { colors } from '@inspectreplyai/themes';

const springAnimation = (duration = 700) => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  LayoutAnimation.configureNext({
    duration, // Duration of the animation in milliseconds
    create: {
      type: LayoutAnimation.Types.spring, // Animation type for creating new views
      property: LayoutAnimation.Properties.scaleXY, // Property to animate
      springDamping: 0.6, // Damping for spring animation
    },
    update: {
      type: LayoutAnimation.Types.spring, // Animation type for updating existing views
      springDamping: 0.6, // Damping for spring animation
    },
    delete: {
      type: LayoutAnimation.Types.spring, // Animation type for deleting views
      property: LayoutAnimation.Properties.opacity, // Property to animate
      springDamping: 0.6, // Damping for spring animation
    },
  });
};

const linearAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
};

/**
 * shows snackbar
 * @param title title to show on snackbar
 * @param _
 */
// const showSnackbar = (
//   title: string,
//   error: boolean = false,
//   duration: number = 2000,
// ) => {
//   if (title !== '' && title !== undefined && title !== null) {
//     if (error) {
//       ToastHelper.showFailureToast(title);
//     } else {
//       ToastHelper.showSuccessToast(title);
//     }
//   }
// };

const showSnackbar = (title: string, color?: string) => {
  if (title !== '' && title !== undefined && title !== null) {
    Snackbar.show({
      text: title,
      duration: 2000,
      numberOfLines: 3,
      textColor: colors.white,
      backgroundColor: color ? color : colors.primaryBlue,
    });
  }
};

const getDeviceDetail = () => {
  const deviceId = getUniqueId();
  const d = deviceId;
  return d;
};

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const isDeviceIOS = () => {
  return Platform.OS === 'ios';
};

const isDeviceAndroid = () => {
  return Platform.OS === 'android';
};

/**
 *
 * @param PermissionAndroid Andoird Permissions
 * @param PermissionIOS IOS Permissions
 */

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number = 500,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (...args: Parameters<T>): void {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

const getAssetDataFromPath = (filePath: string) => {
  const name = filePath?.split?.('/').pop();
  const fileName = name?.split?.('.')?.[0];
  const extension = (name && name.split('.').pop()) ?? 'jpg';

  return { fileName, extension };
};
function addOpacityToHexColor(hex: string, opacity: number): string {
  // Ensure the opacity is within the valid range [0, 1]
  if (opacity < 0) {
    opacity = 0;
  }
  if (opacity > 1) {
    opacity = 1;
  }
  // Convert opacity to a 0-255 range
  const alpha = Math.round(opacity * 255);
  // Expand shorthand hex (e.g., #03F) to full form (e.g., #0033FF)
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  // Add the alpha value to the hex color
  return `${hex}${alpha.toString(16).padStart(2, '0')}`.toUpperCase();
}

function isNumeric(str: string) {
  if (typeof str !== 'string') {
    return false;
  } // we only process strings!
  return (
    // !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const getFormattedDate = (date: string | undefined, format: string) => {
  return moment(date).format(format);
};

const removeEmojis = (string: string) => {
  // emoji regex from the emoji-regex library
  const regex =
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

  return string?.replace(regex, '');
};

function getFirstAndLastName(fullName: string) {
  if (fullName) {
    const [firstName = '', lastName = ''] = fullName.split(' ');
    return { firstName, lastName };
  } else {
    return { firstName: fullName, lastName: '' };
  }
}

function convertDataAccodingToFlatList(data: any[]) {
  // const grouped = data?.reduce(
  //   (acc: { [x: string]: any[] }, item: { category_name: any }) => {
  //     const category = item?.category_name;
  //     if (!acc[category]) {
  //       acc[category] = [];
  //     }
  //     acc[category]?.push(item);
  //     return acc;
  //   },
  //   {},
  // );
  // return Object.keys(grouped).map((key) => ({
  //   title: key,
  //   data: grouped[key],
  // }));

  return data.map((item) => ({
    title: item._id,
    data: item.contractors,
  }));
}

const dateFormatter = (date = '', format: string = 'MM/DD/YYYY') => {
  return moment(date).format(format);
};

const formatCurrency = (amount: number = 0) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default {
  debounce,
  isNumeric,
  isDeviceIOS,
  removeEmojis,
  showSnackbar,
  springAnimation,
  linearAnimation,
  getDeviceDetail,
  dismissKeyboard,
  isDeviceAndroid,
  getFormattedDate,
  getFirstAndLastName,
  getAssetDataFromPath,
  addOpacityToHexColor,
  convertDataAccodingToFlatList,
  dateFormatter,
  formatCurrency,
};
