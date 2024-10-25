import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { TextStyle } from 'react-native';

interface CustomTabBarProps extends MaterialTopTabBarProps {
  customLabelStyle?: TextStyle;
}
