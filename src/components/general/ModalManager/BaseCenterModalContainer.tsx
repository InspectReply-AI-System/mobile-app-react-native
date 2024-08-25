import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';

import Column from '../Column';
import { normalize } from '@inspectreplyai/utils';

const BaseCenterModalContainer = ({ style, children, ...props }: ViewProps) => {
  return (
    <Column style={StyleSheet.compose(styles.container, style)} {...props}>
      {children}
    </Column>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: normalize(20),
  },
});

export default BaseCenterModalContainer;
