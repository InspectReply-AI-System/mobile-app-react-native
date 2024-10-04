import { Text } from 'react-native';
import React from 'react';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import LocalImage from '@inspectreplyai/components/general/LocalImage';

const Welcome = () => {
  const { welocmeScreen } = useAppSelector((state) => state.ConfigSlice);
  const onPressContinue = () => {
    if (welocmeScreen) {
      navigate(ROUTES.LOGIN);
    } else navigate(ROUTES.SIGNUP);
  };
  const onPressSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  const onPressRegister = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <Column style={styles.container}>
      <Column style={styles.innerContainer}>
        <LocalImage style={styles.imageStyle} source={Images.appIcon} />
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
        <Column
          style={[
            styles.buttonContainer,
            { marginTop: welocmeScreen ? '50%' : '40%' },
          ]}>
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
