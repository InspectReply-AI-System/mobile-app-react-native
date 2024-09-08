import { GestureResponderEvent, ViewStyle } from 'react-native';

interface FloatingButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  icon?: string;
  customStyle?: ViewStyle;
  textColor?: string;
}
