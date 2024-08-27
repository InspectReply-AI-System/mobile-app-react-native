import { ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export interface HeaderProps {
  leftIcon?: ReactNode | ImageSourcePropType;
  title?: string;
  rightIcon?: ReactNode | ImageSourcePropType;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}
