import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';
import { CustomTabBarProps } from './@types';
import Row from '@inspectreplyai/components/general/Row';
import { colors, typography } from '@inspectreplyai/themes';
import Touchable from '@inspectreplyai/components/general/Touchable';

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  customLabelStyle,
}) => {
  return (
    <Row style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const label: string = descriptors[route.key].route.name ?? route.name;

        const isActive = state.index === index;
        const onPress = () => navigation.navigate(route.name);

        return (
          <Touchable
            key={route.key}
            onPress={onPress}
            style={[
              styles.tab,
              {
                backgroundColor: isActive
                  ? colors.primaryBlue
                  : colors.primaryBlack,
              },
            ]}>
            <Text
              style={[
                typography.h6,
                { color: isActive ? colors.white : colors.grey },
                customLabelStyle,
              ]}>
              {label}
            </Text>
          </Touchable>
        );
      })}
    </Row>
  );
};
