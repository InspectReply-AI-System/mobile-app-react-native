import React, { forwardRef, useEffect } from 'react';
import { TextInput, TextInputProps, Text } from 'react-native';

import { styles } from './style';
import { colors } from '@inspectreplyai/themes';
import Column from '@inspectreplyai/components/general/Column';
import { CommonFunctions } from '@inspectreplyai/utils';

interface CustomInputProps extends TextInputProps {
  label: string;
  isError?: boolean;
}

const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ label, ...props }, ref) => {
    useEffect(() => {
      CommonFunctions.linearAnimation();
    }, [props.isError]);

    return (
      <>
        <Column style={styles.container}>
          <Column style={styles.labelContiainer}>
            <Text style={styles.label}>{label}</Text>
          </Column>

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
            placeholderTextColor={colors.grey47464F}
            selectionColor={colors.white}
          />
        </Column>
        {props.isError && <Text style={styles.error}>{props.isError}</Text>}
      </>
    );
  },
);
CustomInput.displayName = 'CustomInput';
export default CustomInput;
