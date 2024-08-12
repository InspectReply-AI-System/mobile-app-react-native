import React from 'react';
import { TextInput, TextInputProps, Text } from 'react-native';

import { styles } from './style';
import { colors } from '@inspectreplyai/themes';
import Column from '@inspectreplyai/components/general/Column';

interface CustomInputProps extends TextInputProps {
  label: string;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
  return (
    <Column style={styles.container}>
      <Column style={styles.labelContiainer}>
        <Text style={styles.label}>{label}</Text>
      </Column>
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        placeholderTextColor={colors.grey47464F}
      />
    </Column>
  );
}
