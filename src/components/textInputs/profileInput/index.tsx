import Column from '@inspectreplyai/components/general/Column';
import Row from '@inspectreplyai/components/general/Row';
import { colors, typography } from '@inspectreplyai/themes';
import React, { forwardRef } from 'react';
import { View, Text, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { SvgProps } from 'react-native-svg';
import { styles } from './styles';

interface CustomTextInputProps extends TextInputProps {
  label: string;
  icon?: React.FC<SvgProps>;
  isError?: string | string[] | any | undefined;
  touched?: boolean;
  isEdit?: boolean;
  inputCustomStyle?: ViewStyle;
}

const CustomProfileInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      icon: Icon,
      isError,
      touched,
      isEdit,
      inputCustomStyle,
      ...textInputProps
    },
    ref,
  ) => {
    return (
      <Column style={styles.container}>
        <Text style={[typography.h7, styles.label]}>{label}</Text>
        <Row
          style={[
            styles.inputContainer,
            isError && touched ? styles.errorBorder : null,
            inputCustomStyle,
          ]}>
          <TextInput
            ref={ref}
            style={[
              typography.body,
              styles.input,
              { color: isEdit ? colors.white : colors.grey },
            ]}
            selectionColor={colors.white}
            {...textInputProps}
          />
          {Icon && (
            <View style={styles.iconContainer}>
              <Icon />
            </View>
          )}
        </Row>
        {isError && touched && <Text style={styles.errorText}>{isError}</Text>}
      </Column>
    );
  },
);
CustomProfileInput.displayName = 'CustomProfileInput';
export default CustomProfileInput;
