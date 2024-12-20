/* eslint-disable react-native/no-unused-styles */
import { Dimensions, StyleSheet } from 'react-native';
import RNModal from 'react-native-modal';
import { useCallback } from 'react';
import {
  ModalData,
  ModalConfig,
  ModalOptions,
  ModalHideParams,
  ModalShowParams,
} from './@types';
import React from 'react';

export type ModalUIProps = {
  isVisible: boolean;
  options: ModalOptions;
  data: ModalData;
  show: (params: ModalShowParams) => void;
  hide: (params: ModalHideParams) => void;
  config?: ModalConfig;
  onHide: () => void;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const ModalUI = ({
  isVisible,
  data,
  options,
  hide,
  onHide,
  config,
}: ModalUIProps) => {
  const { children } = data;
  const { style } = config || {};
  const { dismissable, position } = options;

  const onBackdropPress = useCallback(() => {
    if (dismissable) {
      hide({});
    }
  }, []);

  if (!children) {
    return null;
  }

  return (
    <RNModal
      {...RNModal.defaultProps}
      isVisible={isVisible}
      useNativeDriver
      deviceHeight={SCREEN_HEIGHT}
      deviceWidth={SCREEN_WIDTH}
      style={[modalPositionStyles[position], styles.modal, style]}
      onBackdropPress={onBackdropPress}
      avoidKeyboard={false}
      onModalHide={onHide}
      backdropOpacity={0.4}
      swipeDirection={['down']}
      onSwipeComplete={onBackdropPress}>
      {children}
    </RNModal>
  );
};

const modalPositionStyles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  center: {
    justifyContent: 'center',
    margin: 20,
  },
});

const styles = StyleSheet.create({
  modal: {},
});
