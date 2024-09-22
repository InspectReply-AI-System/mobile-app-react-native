import { ActivityIndicator } from 'react-native';
import React from 'react';
import Column from '../general/Column';
import { styles } from './styles';
import { CustomLoaderProps } from './@types';
import { colors } from '@inspectreplyai/themes';

const CustomLoader = ({
  size = 'large',
  color = colors.white,
  customContainerStyle,
  loaderStyle,
}: CustomLoaderProps) => {
  return (
    <Column style={[styles.container, customContainerStyle]}>
      <ActivityIndicator size={size} color={color} style={loaderStyle} />
    </Column>
  );
};

export default CustomLoader;
