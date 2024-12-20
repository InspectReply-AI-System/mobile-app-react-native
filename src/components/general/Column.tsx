import { View, StyleSheet, ViewProps } from 'react-native';
import React from 'react';

interface Props extends ViewProps {
  children?: React.ReactNode;
}

export default function Column(props: Props) {
  return (
    <View {...props} style={[props.style, viewStyles.container]}>
      {props.children}
    </View>
  );
}

const viewStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});
