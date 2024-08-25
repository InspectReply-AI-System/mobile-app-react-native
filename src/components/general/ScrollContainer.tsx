import React from 'react';
import {
  ScrollViewProps,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

import Touchable from './Touchable';
import { CommonFunctions } from '@inspectreplyai/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props extends ScrollViewProps {
  children?: React.ReactNode;
  touchableStyle?: TouchableOpacityProps['style'];
}

export default function ScrollContainer(props: Props) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      {...props}>
      <Touchable
        style={[styles.scrollTouchable, props.touchableStyle]}
        activeOpacity={1}
        onPress={CommonFunctions.dismissKeyboard}>
        {props.children}
      </Touchable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollTouchable: { flex: 1 },
});
