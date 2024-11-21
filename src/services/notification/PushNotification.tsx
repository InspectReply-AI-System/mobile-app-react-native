import React, { useEffect, useRef } from 'react';
import { Alert, AppState, Linking, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import Permission from 'react-native-permissions';
import { SET_DATA } from '@inspectreplyai/redux/auth/AuthSlice';
import { showSuccessToast } from '@inspectreplyai/components/toast';

const NotificationService = () => {
  const appState = useRef(AppState.currentState);
  const dispatch = useDispatch();

  PushNotification.createChannel(
    {
      channelId: 'IRP_fcm_fallback_notification_channel',
      channelName: 'IRP Push Notifications Channel',
      channelDescription: 'IRP push notifications channel',
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  // get the fcm token
  const getFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();

      console.log('Your Firebase Token is Push Notification:', fcmToken);
      if (fcmToken) {
        dispatch(SET_DATA({ fcmToken: fcmToken }));
        console.log('Your Firebase Token for Push Notification:', fcmToken);
      } else {
        console.log('Failed', 'No token received');
      }
    } catch (error) {
      console.log('error on fcm', error);
    }
  };

  const requestUserPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const { status } = await Permission.requestNotifications([
          'alert',
          'badge',
        ]);
        switch (status) {
          case Permission.RESULTS.DENIED:
            Alert.alert(
              'Notification Permission',
              'Please allow notifications from app settings' +
                'settings. Allow the app to send notification',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Ok',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
            break;
          case Permission.RESULTS.GRANTED:
            getFcmToken();
            break;
          case Permission.RESULTS.BLOCKED:
            Alert.alert(
              'Notification Permission',
              'Please allow notifications from app settings' +
                'settings. Allow the app to send notification',
              [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Ok',
                  onPress: () => Linking.openSettings(),
                },
              ],
            );
            break;
          default:
            break;
        }
      } catch (error) {
        // Show promt notification service not available
        console.log('heeloo', error);
      }
    } else {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        getFcmToken();
      } else {
        if (messaging.AuthorizationStatus.DENIED === authStatus) {
          Alert.alert(
            'Notification Permission',
            'Please allow notifications from app settings' +
              'settings. Allow the app to send notification',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'default',
              },
              {
                text: 'OK',
                onPress: () => Linking.openSettings(),
                style: 'default',
              },
            ],
          );
        }
      }
    }
  };

  const navigateToPage = (data: any) => {
    const { type } = data;
    switch (type) {
      case 'navigation basis on type':
        break;

      default:
        break;
    }
  };

  const requestPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      await getFcmToken();
    } else {
      requestUserPermission();
    }
  };

  PushNotification.configure({
    onNotification: (notification: {
      userInteraction: any;
      finish: (arg0: string) => void;
      data?: any;
    }) => {
      console.log('notificationnotificationnotification', notification);
      if (notification?.userInteraction) {
        navigateToPage(notification?.data);
        notification.finish('');
      }
    },

    popInitialNotification: false,
    requestPermissions: true,
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleNotificationImage = (remoteMessage: any) => {
    const {
      notification: { title = '', body = '' },
    }: any = remoteMessage;
    console.log('remoteMessage', remoteMessage);
    showSuccessToast(body, title);
  };

  useEffect(() => {
    requestPermission();
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      console.log('Message handled in the open state', remoteMessage);
      navigateToPage(remoteMessage?.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          navigateToPage(remoteMessage?.data);
          PushNotification.clearAllNotifications();
        }
      });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // when the app is in foreground handle notification from here
    const subscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(
        'remote message of notification =============',
        remoteMessage,
      );

      handleNotificationImage(remoteMessage);
    });

    return () => {
      subscribe();
    };
  }, []);
  return <></>;
};

export default React.memo(NotificationService);
