import React from 'react';

import FastImage, { FastImageProps } from 'react-native-fast-image';

interface Props extends FastImageProps {
  randomBackground?: boolean;
}

export default function ImageWrapper({ style, ...props }: Props) {
  return <FastImage style={style} {...props} />;
}
