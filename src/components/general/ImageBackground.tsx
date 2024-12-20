import { ImageBackgroundProps, ImageBackground } from 'react-native';
import React from 'react';

interface Props extends ImageBackgroundProps {}

function ImageBackgroundWrapper({ resizeMode = 'cover', ...props }: Props) {
  return <ImageBackground resizeMode={resizeMode} {...props} />;
}

export default ImageBackgroundWrapper;
