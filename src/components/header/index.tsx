import React from 'react';
import Row from '../general/Row';
import { styles } from './styles';
import { HeaderProps } from './@types';
import Column from '../general/Column';
import Touchable from '../general/Touchable';
import LocalImage from '../general/LocalImage';
import { typography } from '@inspectreplyai/themes';
import { Text, ImageSourcePropType } from 'react-native';
import { goBack } from '@inspectreplyai/utils/navigationUtils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomHeader: React.FC<HeaderProps> = ({
  leftIcon,
  title,
  rightIcon,
  onLeftPress = goBack,
  onRightPress,
  customRightIconStyle,
  titleCustomStyle,
  disabled,
  rightLabel,
  onPressRightLabel,
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
          <Touchable onPress={onRightPress} disabled={disabled}>
            {renderIcon(rightIcon)}
          </Touchable>
        )}
        {rightLabel && (
          <Touchable onPress={onPressRightLabel}>
            <Text style={typography.h6}>{rightLabel}</Text>
          </Touchable>
        )}
      </Column>
    </Row>
  );
};

export default CustomHeader;
