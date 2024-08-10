import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

interface Props extends ActivityIndicatorProps {
  children?: React.ReactNode;
}

export default function Indicator(props: Props) {
  return <ActivityIndicator {...props} />;
}
