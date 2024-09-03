import { Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { styles } from './styles';
import SplashScreen from 'react-native-splash-screen';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import LocalImage from '@inspectreplyai/components/general/LocalImage';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import { RootState } from '@inspectreplyai/redux/Store';

const Splash = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { user } = useAppSelector((store: RootState) => store.AuthSlice);
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
      setTimeout(() => {
        if (user.token) {
          reset(ROUTES.BOTTOMTAB);
        } else {
          reset(ROUTES.AUTHNAVIGATOR);
        }
      }, 1000);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [opacity]);

  return (
    <Column style={styles.container}>
      <Animated.View style={{ opacity }}>
        <LocalImage source={Images.appIcon} style={styles.imageStyle} />
      </Animated.View>
    </Column>
  );
};

export default Splash;
