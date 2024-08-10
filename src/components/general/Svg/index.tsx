import React from 'react';
import { SvgProps } from './@types';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';

type props = SvgProps;

const Svg = ({ Component, imageStyle, uri, style }: props) => (
  <View style={style}>
    {Component ? (
      <Component width='100%' height='100%' {...imageStyle} />
    ) : null}

    {uri ? (
      <SvgUri uri={uri} width='100%' height='100%' {...imageStyle} />
    ) : null}
  </View>
);

export default Svg;
