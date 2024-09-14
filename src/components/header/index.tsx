import React from 'react';
import { Text, ImageSourcePropType } from 'react-native';
import Row from '../general/Row';
import { styles } from './styles';
import { HeaderProps } from './@types';
import Column from '../general/Column';
import Touchable from '../general/Touchable';
import { goBack } from '@inspectreplyai/utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LocalImage from '../general/LocalImage';

const CustomHeader: React.FC<HeaderProps> = ({
  leftIcon,
  title,
  rightIcon,
  onLeftPress = goBack,
  onRightPress,
  customRightIconStyle,
  titleCustomStyle,
}) => {
  const insets = useSafeAreaInsets();

  const renderIcon = (icon?: React.ReactNode | ImageSourcePropType) => {
    if (React.isValidElement(icon)) {
      return icon;
    }

    if (typeof icon === 'number' || typeof icon === 'object') {
      return <LocalImage source={icon} style={customRightIconStyle} />;
    }

    return null;
  };

  return (
    <Row style={[styles.header, { marginTop: insets.top }]}>
      <Column style={styles.leftContainer}>
        {leftIcon && (
          <Touchable onPress={onLeftPress}>{renderIcon(leftIcon)}</Touchable>
        )}
      </Column>
      <Column style={styles.titleContainer}>
        {title && <Text style={[styles.title, titleCustomStyle]}>{title}</Text>}
      </Column>
      <Column style={styles.rightContainer}>
        {rightIcon && (
          <Touchable onPress={onRightPress}>{renderIcon(rightIcon)}</Touchable>
        )}
      </Column>
    </Row>
  );
};

export default CustomHeader;
