import { TextStyle, ViewStyle } from 'react-native';

export interface NotiCardProps {
  heading: string;
  subLabel: string;
  description: string;
  onActionPress: () => void;
  customDescStyle?: TextStyle;
  onRightIconPress: () => void;
  customHeadingStyle?: TextStyle;
  customSubLabelStyle?: TextStyle;
  containerCustomStyle?: ViewStyle;
}
