import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface CustomButtonPropsType {
  title?: string;
  leftIcon?: ImageSourcePropType;
  disabled?: boolean;
  iconStyle?: ImageStyle;
  rightIcon?: ImageStyle;
  loading?: boolean;
  onPress: () => void;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}
