import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize, SCREEN_HEIGHT, vh } from '@inspectreplyai/utils/Dimensions';
import { bottomTabs } from './constants';
import { colors, fonts } from '@inspectreplyai/themes';
import LocalImage from '@inspectreplyai/components/general/LocalImage';

const TabBar = ({ state, descriptors, navigation }: any) => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: inset.bottom - 20 }]}>
      <View style={styles.tabIconsContainer}>
        {state.routes.map(
          (route: { key: string | number; name: string }, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            const activeIcon = bottomTabs[index]?.icon;

            return (
              <TouchableWithoutFeedback
                accessibilityRole='button'
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={styles.bottomTabsButtons}
                key={`${index}--${route.key}`}>
                <View style={styles.innerView}>
                  <LocalImage
                    style={{
                      tintColor: isFocused
                        ? colors.primaryBlue
                        : colors.grey999999,
                    }}
                    source={activeIcon}
                  />
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: isFocused
                          ? colors.primaryBlue
                          : colors.grey999999,
                      },
                    ]}
                    allowFontScaling={false}>
                    {label}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          },
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabsButtons: {
    flex: 1,
  },

  container: {
    backgroundColor: colors.black,
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },

  innerView: {
    paddingVertical: SCREEN_HEIGHT * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabIconsContainer: {
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: normalize(10),
    fontFamily: fonts.MEDIUM,
    marginVertical: vh(13),
  },
});

export default React.memo(TabBar);
