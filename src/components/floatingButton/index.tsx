import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import { FloatingButtonProps } from './@types';
import Touchable from '../general/Touchable';
import { colors } from '@inspectreplyai/themes';

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon = '+',
  customStyle = {},
  textColor = colors.white,
}) => (
  <Touchable style={[styles.container, customStyle]} onPress={onPress}>
    <Text style={[styles.icon, { color: textColor }]}>{icon}</Text>
  </Touchable>
);

export default FloatingButton;
