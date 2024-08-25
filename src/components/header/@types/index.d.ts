import { ImageSourcePropType } from 'react-native';

export interface HeaderProps {
  leftIcon?: ImageSourcePropType;
  title?: string;
  rightIcon?: ImageSourcePropType;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}
