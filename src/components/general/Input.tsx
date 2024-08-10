import { TextInput, TextInputProps } from 'react-native';
import React from 'react';

interface Props extends TextInputProps {
  children?: React.ReactNode;
}

export default function Input(props: Props) {
  return <TextInput {...props} />;
}
