import { SVGProps } from 'react';
import { StyleProp } from 'react-native/types';

export interface SvgProps {
  Component?: SVGProps;
  imageStyle?: SVGProps;
  style?: StyleProp;
  uri?: string;
}
