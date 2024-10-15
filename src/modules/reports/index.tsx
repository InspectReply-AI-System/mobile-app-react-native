import React, { useEffect, useState } from 'react';
import SavedTab from './savedTab';
import RecentTab from './recentTab';
import SharedTab from './sharedTab';
import { StyleSheet } from 'react-native';
import { colors } from '@inspectreplyai/themes';
import Search from './../../assets/svg/search.svg';
import { CustomTabBar } from './components/customTabBar';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings, normalize, vh, vw } from '@inspectreplyai/utils';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserGuide from '../userGuide';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { getProfile } from '@inspectreplyai/redux/auth/action';
import { SET_DATA } from '@inspectreplyai/redux/auth/AuthSlice';

const Tab = createMaterialTopTabNavigator();

const Reports: React.FC = () => {
  const [isGuideVisible, setIsGuideVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState('');
  const { user, isSignUp } = useAppSelector((store) => store.AuthSlice);
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
      <CustomHeader title='Reports' />
      <CustomInput
        RightIcon={Search}
        placeholder={CommonStrings.searchReports}
        customStyle={styles.customTextStyle}
        placeholderTextColor={colors.white}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
        <Tab.Screen name='Recent' component={RecentTab} />
        <Tab.Screen name='Saved' component={SavedTab} />
        <Tab.Screen name='Shared' component={SharedTab} />
      </Tab.Navigator>
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
    paddingHorizontal: vw(16),
  },
  customTextStyle: {
    borderRadius: normalize(24),
    marginBottom: vh(16),
    backgroundColor: colors.black27282B,
    height: normalize(40),
    borderWidth: 0,
  },
});

export default Reports;
