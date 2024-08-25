import React from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';

import { normalize } from '@inspectreplyai/utils';

const BaseBottomModalContainer = ({ children, style, ...props }: ViewProps) => {
  return (
    <Animated.View style={[styles.container, style]} {...props}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: normalize(20),
    borderTopLeftRadius: normalize(20),
    padding: normalize(20),
  },
});

export default BaseBottomModalContainer;
