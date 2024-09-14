/* eslint-disable react-native/no-color-literals */
import { colors, typography } from '@inspectreplyai/themes';
import { Icons } from '@inspectreplyai/themes/appImages';
import { normalize } from '@inspectreplyai/utils';
import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, View, I18nManager, Text } from 'react-native';
import FastImage from 'react-native-fast-image';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class AppleStyleSwipeableRow extends Component<
  PropsWithChildren<{ leftActionHandler: Function; hideEdit?: boolean }>
> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      // eslint-disable-next-line no-alert
      this.props?.leftActionHandler(text);
    };

    return (
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: trans }],
        }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <FastImage source={Icons.bin} style={styles.binIcon} />
          <Text style={typography.body}>Trash</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: !this.props?.hideEdit ? 135 : 90.5,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        marginLeft: -5,
      }}>
      {!this.props?.hideEdit &&
        this.renderRightAction('Edit', colors.blue, 130, progress)}
      {this.renderRightAction('Delete', colors.red, 60, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        containerStyle={styles.containerStyle}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: colors.white,
    fontSize: 16,
    backgroundColor: colors.transparent,
    padding: 10,
  },
  binIcon: {
    alignItems: 'center',
    width: normalize(21),
    height: normalize(24),
    marginBottom: 6,
  },
  containerStyle: {
    borderRadius: 10,
  },
  leftAction: {
    flex: 1,
    backgroundColor: colors.purpleBlue,
    justifyContent: 'center',
  },
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
