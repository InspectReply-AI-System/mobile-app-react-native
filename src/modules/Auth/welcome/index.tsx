import { Text } from 'react-native';
import React from 'react';

import { styles } from './styles';
import { typography } from '@inspectreplyai/themes';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import ImageWrapper from '@inspectreplyai/components/general/Image';

import { CommonStrings } from '@inspectreplyai/utils';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';

const Welcome = () => {
  return (
    <Column style={styles.container}>
      <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
      <Column style={styles.innerContainer}>
        <Text style={[typography.h1, styles.welcomeHeading]}>
          {CommonStrings.WelcomeToInspectReplyAI}
        </Text>
        <Text style={[typography.body, styles.description]}>
          {CommonStrings.welcomeDescription}
        </Text>
        <Column style={styles.buttonContainer}>
          <PrimaryButton
            onPress={() => {
              navigate(ROUTES.LOGIN);
            }}
            title={CommonStrings.getStarted}
          />
          <Text style={[typography.h6, styles.signIntext]}>
            {CommonStrings.signIn}
          </Text>
        </Column>
      </Column>
    </Column>
  );
};

export default Welcome;
