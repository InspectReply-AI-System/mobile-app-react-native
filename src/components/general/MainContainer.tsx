import React from 'react';
import { ViewProps, View, SafeAreaView, StyleSheet } from 'react-native';

interface Props extends ViewProps {
  children?: React.ReactNode;
}

export default function MainContainer({ style, ...props }: Props) {
  return (
    <View {...props} style={[styles.containerStyle, style]}>
      <SafeAreaView style={styles.safeAreaStyle} />
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  safeAreaStyle: { flex: 0 },
});
