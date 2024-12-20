import { Icons } from '@inspectreplyai/themes/appImages';
import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { styles } from './styles';

const Loader = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Icons.loader}
        style={{ transform: [{ rotate }] }}
      />
    </View>
  );
};

export default Loader;
