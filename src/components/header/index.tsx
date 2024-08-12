import React from 'react';
import { Text } from 'react-native';

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
}) => {
  const inset = useSafeAreaInsets();
  return (
    <Row style={[styles.header, { marginTop: inset.top }]}>
      <Column style={styles.leftContainer}>
        {leftIcon && (
          <Touchable onPress={onLeftPress}>
            <LocalImage source={leftIcon} />
          </Touchable>
        )}
      </Column>
      <Column style={styles.titleContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
      </Column>
      <Column style={styles.rightContainer}>
        {rightIcon && (
          <Touchable onPress={onRightPress}>
            <LocalImage source={rightIcon} />
          </Touchable>
        )}
      </Column>
    </Row>
  );
};

export default CustomHeader;
