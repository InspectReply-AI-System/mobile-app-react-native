import { Alert } from 'react-native';
import {
  check,
  RESULTS,
  request,
  Permission,
  openSettings,
} from 'react-native-permissions';
import { isIOS } from './platform';
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
          'Permissions Blocked',
          '',
          [
            {
              text: 'Go to settings',
              onPress: () => openSettings(),
              isPreferred: true,
              style: 'default',
            },
            {
              text: 'Cancel',
              style: 'destructive',
            },
          ],
          { cancelable: true },
        );
      } else if (resp === RESULTS.GRANTED || resp === RESULTS.LIMITED) {
        return true;
      } else {
        throw new Error('Permission not granted');
      }
    }
    return true;
  } catch (error: any) {
    // showSnackbar(error.message);
    return false;
  }
};
