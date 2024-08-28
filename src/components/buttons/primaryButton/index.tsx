import React from 'react';
import { Text } from 'react-native';

import { styles } from './styles';
import { CustomButtonPropsType } from './@types';
import Touchable from '@inspectreplyai/components/general/Touchable';
import Loader from '@inspectreplyai/components/general/Loader';

/**
 * @param props
 * @returns
 */
const PrimaryButton = (props: CustomButtonPropsType) => {
  const {
    title = 'Submit',
    onPress,
    loading = false,
    disabled,
    titleStyle,
    containerStyle,
    ...rest
  } = props;

  return (
    <Touchable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        disabled ? styles.disableButtonStyle : styles.contentContainer,
        containerStyle,
      ]}
      {...rest}>
      {loading ? (
        <Loader />
      ) : (
        <Text
          allowFontScaling={false}
          style={[disabled ? styles.disableText : styles.title, titleStyle]}>
          {title}
        </Text>
      )}
    </Touchable>
  );
};

export default React.memo(PrimaryButton);
