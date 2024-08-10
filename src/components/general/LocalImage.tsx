import React from 'react';
import { ImageProps, Image } from 'react-native';

interface Props extends ImageProps {}

export default function LocalImage(props: Props) {
  return <Image {...props} />;
}
