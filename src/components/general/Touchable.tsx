import { TouchableOpacityProps, TouchableOpacity } from 'react-native';
import React from 'react';

interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
}

export default function Touchable(props: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      {props.children}
    </TouchableOpacity>
  );
}
