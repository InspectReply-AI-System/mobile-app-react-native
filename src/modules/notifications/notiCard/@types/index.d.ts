import { TextStyle, ViewStyle } from 'react-native';

export interface NotiCardProps {
  heading: string;
  subLabel: string;
  onPressCard: () => void;
  onActionPress: () => void;
  customDescStyle?: TextStyle;
  onRightIconPress: () => void;
  customHeadingStyle?: TextStyle;
  customSubLabelStyle?: TextStyle;
  containerCustomStyle?: ViewStyle;
}
