import { ReactNode } from 'react';
import { ImageSourcePropType, ImageStyle, TextStyle } from 'react-native';

export interface HeaderProps {
  leftIcon?: ReactNode | ImageSourcePropType;
  title?: string;
  rightIcon?: ReactNode | ImageSourcePropType;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  customRightIconStyle?: ImageStyle;
  titleCustomStyle?: TextStyle;
  disabled?: boolean;
  rightLabel?: string;
  onPressRightLabel?: () => void;
}
