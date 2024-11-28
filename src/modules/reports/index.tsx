import React, { useEffect, useState } from 'react';
import SavedTab from './savedTab';
import RecentTab from './recentTab';
import SharedTab from './sharedTab';
import { CustomTabBar } from '@inspectreplyai/components/customTabBar';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings } from '@inspectreplyai/utils';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserGuide from '../userGuide';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { getProfile } from '@inspectreplyai/redux/auth/action';
import { SET_DATA } from '@inspectreplyai/redux/auth/AuthSlice';
import FloatingButton from '@inspectreplyai/components/floatingButton';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { styles } from './styles';
import { showErrorToast } from '@inspectreplyai/components/toast';
import { updateDeviceToken } from '@inspectreplyai/network/authApis';

const Tab = createMaterialTopTabNavigator();

const Reports: React.FC = () => {
  const [isGuideVisible, setIsGuideVisible] = useState(false);
  const [step, setStep] = useState(1);

  const { user, isSignUp, fcmToken } = useAppSelector(
    (store) => store.AuthSlice,
  );

  const handleToken = async () => {
    try {
      await updateDeviceToken({
        cust_id: user?.userId,
        user_device_token: fcmToken,
      });
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const dispatch = useAppDispatch();
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsGuideVisible(false);
      dispatch(SET_DATA({ isSignUp: false }));
    }
  };

  useEffect(() => {
    handleToken();
    dispatch(getProfile({ customerId: user?.userId }));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsGuideVisible(true);
    }, 0);
    return () => {
      dispatch(SET_DATA({ isSignUp: false }));
    };
  }, []);

  const handleSkip = () => {
    setIsGuideVisible(false);
    dispatch(SET_DATA({ isSignUp: false }));
  };
  return (
    <Column style={styles.container}>
      {isSignUp && (
        <UserGuide
          isVisible={isGuideVisible}
          onClose={handleNextStep}
          onSkip={handleSkip}
          step={step}
        />
      )}
      <CustomHeader title={CommonStrings.reports} />

      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name={CommonStrings.recent} component={RecentTab} />
        <Tab.Screen name={CommonStrings.saved} component={SavedTab} />
        <Tab.Screen name={CommonStrings.shared} component={SharedTab} />
      </Tab.Navigator>
      <FloatingButton
        onPress={() => {
          navigate(ROUTES.ADDREPORTS);
        }}
      />
    </Column>
  );
};

export default Reports;
