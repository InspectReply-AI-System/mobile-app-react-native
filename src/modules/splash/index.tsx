import React, { useEffect, useRef } from 'react';

import SplashScreen from 'react-native-splash-screen';
import { Images } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { styles } from './styles';
import { Animated } from 'react-native';

const Splash = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [opacity]);

  return (
    <Column style={styles.container}>
      <Animated.View style={{ opacity }}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
      </Animated.View>
    </Column>
  );
};

export default Splash;
