import Row from '@inspectreplyai/components/general/Row';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { colors, typography } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type CustomTabBarProps = {
  state: {
    index: number;
    routes: { key: string; name: string }[];
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarLabel?: string;
      };
    };
  };
  navigation: {
    navigate: (name: string) => void;
  };
};

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <Row style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;

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
                  : colors.primaryBalck,
              },
            ]}>
            <Text
              style={[
                typography.h6,
                { color: isActive ? colors.white : colors.grey },
              ]}>
              {label}
            </Text>
          </Touchable>
        );
      })}
    </Row>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: vh(10),
    borderRadius: normalize(6),
  },
  tabBarContainer: {
    backgroundColor: colors.primaryBalck,
    paddingVertical: vh(4),
    paddingHorizontal: vw(4),
    borderRadius: normalize(8),
    borderColor: colors.primaryBlue,
    borderWidth: normalize(1),
    marginBottom: vh(12),
  },
});
