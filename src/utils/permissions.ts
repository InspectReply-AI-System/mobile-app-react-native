import { Alert, Platform } from 'react-native';
import {
  check,
  RESULTS,
  request,
  Permission,
  openSettings,
  requestMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import { isIOS } from './platform';
import { CommonStrings } from './stringsUtils';
export const requestPermissions = async (
  PermissionAndroid: Permission,
  PermissionIOS: Permission,
) => {
  try {
    const Permission = isIOS ? PermissionIOS : PermissionAndroid;
    let result = await check(Permission);
    if (result !== RESULTS.GRANTED) {
      const resp = await request(Permission);
      if (resp === RESULTS.BLOCKED) {
        Alert.alert(
          CommonStrings.permissionBlocked,
          '',
          [
            {
              text: CommonStrings.goToSetting,
              onPress: () => openSettings(),
              isPreferred: true,
              style: 'default',
            },
            {
              text: CommonStrings.cancel,
              style: 'destructive',
            },
          ],
          { cancelable: true },
        );
      } else if (resp === RESULTS.GRANTED || resp === RESULTS.LIMITED) {
        return true;
      } else {
        throw new Error(CommonStrings.permissionNotGranted);
      }
    }
    return true;
  } catch (error: any) {
    return false;
  }
};

const CurrentVersion = parseInt(`${Platform.constants.Release}`, 10);

export const permissionComponent = {
  Camera: (cb: any, err: any) => {
    requestMultiple(
      Platform.OS === 'ios'
        ? [PERMISSIONS.IOS.CAMERA]
        : [PERMISSIONS.ANDROID.CAMERA],
    )
      .then((res: any) => {
        let result =
          Platform.OS === 'android'
            ? res[PERMISSIONS.ANDROID.CAMERA]
            : res[PERMISSIONS.IOS.CAMERA];
        let status = true;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            status = false;
            break;
          case RESULTS.GRANTED:
            status = true;
            break;
          case RESULTS.BLOCKED:
            status = false;
            break;
          default:
            status = true;
        }
        cb(status);
      })
      .catch(() => {
        err();
      });
  },
  Gallery: (cb: any, err: any) => {
    requestMultiple(
      Platform.OS === 'android'
        ? CurrentVersion <= 12
          ? [
              PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ]
          : [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
        : [
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          ],
    )
      .then((res: any) => {
        let result =
          Platform.OS === 'android'
            ? CurrentVersion <= 12
              ? res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]
              : res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
            : res[PERMISSIONS.IOS.PHOTO_LIBRARY];
        let status = true;
        switch (result) {
          case RESULTS.UNAVAILABLE:
            status = false;
            break;
          case RESULTS.DENIED:
            status = false;
            break;
          case RESULTS.GRANTED:
            break;
          case RESULTS.LIMITED:
            status = true;
            break;
          case RESULTS.BLOCKED:
            status = false;
            break;
          default:
            status = true;
        }
        cb(status);
      })
      .catch(() => {
        err();
      });
  },
};
