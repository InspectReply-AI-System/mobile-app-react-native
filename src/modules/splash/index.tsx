import React, { useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { styles } from './styles';

const Splash = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Column style={styles.container}>
      <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
    </Column>
  );
};

export default Splash;
