import { View, StyleSheet, ViewProps, Animated } from 'react-native';
import React from 'react';

interface Props extends ViewProps {
  children?: React.ReactNode;
  animated?: boolean;
}

export default function Row(props: Props) {
  if (props.animated) {
    return (
      <Animated.View {...props} style={[props.style, viewStyles.container]}>
        {props.children}
      </Animated.View>
    );
  }
  return (
    <View {...props} style={[props.style, viewStyles.container]}>
      {props.children}
    </View>
  );
}

const viewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
