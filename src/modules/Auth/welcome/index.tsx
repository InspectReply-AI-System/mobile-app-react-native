import { Text } from 'react-native';
import React from 'react';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings, vh } from '@inspectreplyai/utils';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import LocalImage from '@inspectreplyai/components/general/LocalImage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Welcome = () => {
  const inset = useSafeAreaInsets();
  const onPressContinue = () => {
    navigate(ROUTES.SIGNUP);
  };
  const onPressSignIn = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <Column style={styles.container}>
      <Column style={styles.innerContainer}>
        <LocalImage style={styles.imageStyle} source={Images.appIcon} />
        <Text style={[typography.h1, styles.welcomeHeading]}>
          {CommonStrings.WelcomeToInspectReplyAI}
        </Text>
        <Text style={[typography.body, styles.description]}>
          {CommonStrings.welcomeDescription}
        </Text>
        <Column
          style={[
            styles.buttonContainer,
            {
              marginBottom: vh(inset.bottom + 16),
            },
          ]}>
          <PrimaryButton
            onPress={onPressContinue}
            title={CommonStrings.getStarted}
          />

          <Text
            onPress={onPressSignIn}
            style={[typography.h6, styles.signIntext]}>
            {CommonStrings.signIn}
          </Text>
        </Column>
      </Column>
    </Column>
  );
};

export default Welcome;
