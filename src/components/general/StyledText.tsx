import { Text, StyleSheet, TextProps } from 'react-native';
import React from 'react';
import { colors } from '@inspectreplyai/themes';

interface Props extends TextProps {
  children?: React.ReactNode;
}

export default function StyledText(props: Props) {
  return (
    <Text {...props} style={[viewStyles.text, props.style]}>
      {props.children}
    </Text>
  );
}

const viewStyles = StyleSheet.create({
  text: {
    color: colors.white,
  },
});
