import { colors } from '@inspectreplyai/themes';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

interface Props extends ActivityIndicatorProps {}

export default function Loader({ size = 'small', ...props }: Props) {
  return <ActivityIndicator size={size} color={colors.white} {...props} />;
}
