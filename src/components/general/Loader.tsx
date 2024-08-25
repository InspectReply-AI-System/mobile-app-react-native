import { colors } from '@inspectreplyai/themes';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

interface Props extends ActivityIndicatorProps {}

export default function Loader(props: Props) {
  return <ActivityIndicator size={'small'} color={colors.white} {...props} />;
}
