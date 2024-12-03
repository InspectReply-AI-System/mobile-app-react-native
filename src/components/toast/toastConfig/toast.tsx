import React, { JSX } from 'react';
import { Text } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { styles } from '../styles';
import Row from '@inspectreplyai/components/general/Row';
import Svg from '@inspectreplyai/components/general/Svg';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { typography } from '@inspectreplyai/themes';

/*
  1. Create the config
*/

const hideToast = () => {
  Toast.hide();
};
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */

  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <Row style={styles.successToastContainer}>
      <Row style={styles.innerContainer}>
        <Svg Component={SvgIcon.Success} style={styles.leftIcon} />
        <Text style={[typography.body, styles.successText]}>{props.text2}</Text>
      </Row>
      <Touchable onPress={hideToast}>
        <Svg style={styles.rightIcon} Component={SvgIcon.Cross} />
      </Touchable>
    </Row>
  ),

  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <Row style={styles.errorToastContainer}>
      <Row style={styles.innerContainer}>
        <Svg Component={SvgIcon.Erorr} style={styles.leftIcon} />
        <Text style={[typography.body, styles.errorText]}>{props.text2}</Text>
      </Row>
      <Touchable onPress={hideToast}>
        <Svg style={styles.rightIcon} Component={SvgIcon.Cross} />
      </Touchable>
    </Row>
  ),

  info: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <Row style={styles.errorToastContainer}>
      <Row style={styles.innerContainer}>
        <Svg Component={SvgIcon.Info} style={styles.leftIcon} />
        <Text style={[typography.body, styles.infoText]}>{props.text2}</Text>
      </Row>
      <Touchable onPress={hideToast}>
        <Svg style={styles.rightIcon} Component={SvgIcon.Cross} />
      </Touchable>
    </Row>
  ),

  notiSuccess: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <Touchable onPress={props?.onPress}>
      <Row style={styles.successToastContainer}>
        <Row style={styles.innerContainer}>
          <Svg Component={SvgIcon.Success} style={styles.leftIcon} />
          <Text style={[typography.body, styles.successText]}>
            {props.text2}
          </Text>
        </Row>
        <Touchable onPress={hideToast}>
          <Svg style={styles.rightIcon} Component={SvgIcon.Cross} />
        </Touchable>
      </Row>
    </Touchable>
  ),
};

/*
  2. Pass the config as prop to the Toast component instance
*/
const ToastMesssge = () => {
  return <Toast position='top' config={toastConfig} topOffset={50} />;
};

export default ToastMesssge;
