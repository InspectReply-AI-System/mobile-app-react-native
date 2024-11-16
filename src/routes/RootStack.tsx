import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '@inspectreplyai/modules/splash';
import ROUTES from './routes';
import AuthNavigator from './AuthStack';
import { BottomTab } from './bottomTab';
import AddReports from '@inspectreplyai/modules/addReports';
import ProcessReport from '@inspectreplyai/modules/addReports/processReport';
import ContractorDetails from '@inspectreplyai/modules/Contractors/ContractorDetails';
import Password from '@inspectreplyai/modules/profile/password';
import { AppState } from 'react-native';
import { useAppDispatch } from '@inspectreplyai/hooks/reduxHooks';
import { SET_CONFIG_DATA } from '@inspectreplyai/redux/config/ConfigSlice';
import { isIOS } from '@inspectreplyai/utils/platform';
import Checkout from '@inspectreplyai/modules/reports/checkout';
import ReportSummary from '@inspectreplyai/modules/reports/reportSummary';
import WebViewer from '@inspectreplyai/modules/webView';
import analytics from '@react-native-firebase/analytics';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (isIOS) {
        if (nextAppState == 'background') {
          dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));
        }
      } else {
        if (nextAppState == 'inactive' || nextAppState == 'background') {
          dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onPressPredefined = async () => {
    try {
      const result = await analytics().logLogin({
        method: 'predefined',
      });
      console.log('result in onPressPredefined', result);
    } catch (error) {
      console.log('error onPressPredefined', error);
    }
  };
  const onPressCustom = async () => {
    try {
      const result = await analytics().logEvent('Inspect_Reply_AI_2', {
        id: 'dxfhmjh_345chggvh',
        item: 'Product 1',
        sizes: '9',
      });
      console.log('result in onPressCustom', result);
    } catch (error) {
      console.log('error in onPressCustom', error);
    }
  };
  useEffect(() => {
    onPressPredefined();
    onPressCustom();
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_right',
      }}>
      <RootStack.Screen component={Splash} name={ROUTES.SPLASH} />
      <RootStack.Screen component={AuthNavigator} name={ROUTES.AUTHNAVIGATOR} />
      <RootStack.Screen component={BottomTab} name={ROUTES.BOTTOMTAB} />
      <RootStack.Screen component={AddReports} name={ROUTES.ADDREPORTS} />
      <RootStack.Screen component={ProcessReport} name={ROUTES.PROCESSREPORT} />
      <RootStack.Screen
        component={ContractorDetails}
        name={ROUTES.CONTRACTORSDETAILS}
      />
      <RootStack.Screen component={Password} name={ROUTES.PASSWORDSCREEN} />
      <RootStack.Screen component={Checkout} name={ROUTES.CHECKOUTSCREEN} />
      <RootStack.Screen component={ReportSummary} name={ROUTES.REPORTSUMMARY} />
      <RootStack.Screen component={WebViewer} name={ROUTES.WEBVIEW} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
