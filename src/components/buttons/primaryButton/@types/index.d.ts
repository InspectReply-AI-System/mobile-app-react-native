import {
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface CustomButtonPropsType extends TouchableOpacityProps {
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
