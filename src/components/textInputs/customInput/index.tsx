import React, { forwardRef, useEffect } from 'react';
import {
  TextInput,
  TextInputProps,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { styles } from './style';
import { colors } from '@inspectreplyai/themes';
import Column from '@inspectreplyai/components/general/Column';
import { CommonFunctions } from '@inspectreplyai/utils';
import { SvgProps } from 'react-native-svg';
import Touchable from '@inspectreplyai/components/general/Touchable';

interface CustomInputProps extends TextInputProps {
  label?: string;
  isError?: boolean;
  RightIcon?: React.FC<SvgProps>;
  onRightIconPress?: () => void;
  customStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  (
    {
      label,
      RightIcon,
      onRightIconPress,
      customStyle,
      placeholderTextColor = colors.grey47464F,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      CommonFunctions.linearAnimation();
    }, [props.isError]);

    return (
      <>
        <Column style={[styles.container, customStyle]}>
          {label && (
            <Column style={styles.labelContiainer}>
              <Text style={styles.label}>{label}</Text>
            </Column>
          )}

          <TextInput
            {...props}
            ref={ref}
            value={
              !props.multiline
                ? CommonFunctions.removeEmojis(props?.value?.trimStart() || '')
                : props?.value?.trimStart()
            }
            style={[
              styles.input,
              { ...(props.isError && { borderColor: colors.red }) },
              props.style,
            ]}
            placeholderTextColor={placeholderTextColor}
            selectionColor={colors.white}
          />
          {RightIcon && (
            <Touchable
              style={styles.rightIconContainer}
              onPress={onRightIconPress}>
              <RightIcon />
            </Touchable>
          )}
        </Column>
        {props.isError && <Text style={styles.error}>{props.isError}</Text>}
      </>
    );
  },
);

CustomInput.displayName = 'CustomInput';
export default CustomInput;
