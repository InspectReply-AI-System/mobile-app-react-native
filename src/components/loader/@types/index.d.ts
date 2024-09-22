import { ActivityIndicatorProps, ViewStyle } from 'react-native';

interface CustomLoaderProps extends ActivityIndicatorProps {
  customContainerStyle?: ViewStyle;
  loaderStyle?: ViewStyle;
}
