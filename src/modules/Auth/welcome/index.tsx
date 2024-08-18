import { Text } from 'react-native';
import React from 'react';

import { styles } from './styles';
import { useDispatch } from 'react-redux';
import ROUTES from '@inspectreplyai/routes/routes';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import { SET_CONFIG_DATA } from '@inspectreplyai/redux/config/ConfigSlice';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import LocalImage from '@inspectreplyai/components/general/LocalImage';

const Welcome = () => {
  const dispatch = useDispatch();
  const { welocmeScreen } = useAppSelector((state) => state.ConfigSlice);
  const onPressContinue = () => {
    dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));
    if (welocmeScreen) {
      reset(ROUTES.LOGIN);
    } else reset(ROUTES.SIGNUP);
  };
  const onPressSignIn = () => {
    dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));
    reset(ROUTES.LOGIN);
  };

  const onPressRegister = () => {
    dispatch(SET_CONFIG_DATA({ welocmeScreen: true }));
    reset(ROUTES.SIGNUP);
  };

  return (
    <Column style={styles.container}>
      <LocalImage style={styles.imageStyle} source={Images.appIcon} />
      <Column style={styles.innerContainer}>
        <Text style={[typography.h1, styles.welcomeHeading]}>
          {welocmeScreen
            ? CommonStrings.welcomeBack
            : CommonStrings.WelcomeToInspectReplyAI}
        </Text>
        <Text style={[typography.body, styles.description]}>
          {welocmeScreen
            ? CommonStrings.welComeBackDescription
            : CommonStrings.welcomeDescription}
        </Text>
        <Column style={styles.buttonContainer}>
          <PrimaryButton
            onPress={onPressContinue}
            title={
              welocmeScreen ? CommonStrings.next : CommonStrings.getStarted
            }
          />
          {!welocmeScreen && (
            <Text
              onPress={onPressSignIn}
              style={[typography.h6, styles.signIntext]}>
              {CommonStrings.signIn}
            </Text>
          )}
          {welocmeScreen && (
            <Text style={[typography.body, styles.dontAccount]}>
              {CommonStrings.dontHaveAccount}
              <Text
                onPress={onPressRegister}
                style={[typography.h6, styles.signIntext]}>
                {CommonStrings.registerHere}
              </Text>
            </Text>
          )}
        </Column>
      </Column>
    </Column>
  );
};

export default Welcome;
