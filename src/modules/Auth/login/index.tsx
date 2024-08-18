import {
  emailValidation,
  passwordValidation,
} from '@inspectreplyai/utils/validatorsUtils';
import { styles } from './styles';
import { Text } from 'react-native';
import React, { useEffect } from 'react';
import ROUTES from '@inspectreplyai/routes/routes';
import { typography } from '@inspectreplyai/themes';
import { useSimpleReducer } from '@inspectreplyai/hooks';
import Row from '@inspectreplyai/components/general/Row';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { CommonStrings, normalize } from '@inspectreplyai/utils';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { goBack, navigate, reset } from '@inspectreplyai/utils/navigationUtils';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
const Login = () => {
  const [state, updateState] = useSimpleReducer({
    currentStep: 1,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });

  const { currentStep, email, emailError, password, passwordError } = state;

  useEffect(() => {
    updateState({
      currentStep: currentStep,
    });
  }, [currentStep]);

  const onPressBack = () => {
    if (currentStep === 1) {
      goBack();
    } else {
      updateState({
        currentStep: 1,
      });
    }
  };

  const onChangeEmail = (email: string) => {
    const _emailError = emailValidation(email.trim());
    updateState({
      email: email,
      emailError: _emailError.errorMsg,
    });
  };

  const onEnterPassword = (password: string) => {
    const passwordError = passwordValidation(password.trim());
    updateState({
      password,
      passwordError: passwordError.errorMsg,
    });
  };

  const onPressNext = () => {
    if (currentStep === 1) {
      updateState({
        currentStep: 2,
      });
    } else {
      reset(ROUTES.BOTTOMTAB);
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return email && !emailError;
    } else {
      return password && !passwordError;
    }
  };

  const onPressForgot = () => {
    updateState({
      currentStep: 1,
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
    });
    navigate(ROUTES.FORGOTPASSWORD);
  };

  const onPressRegister = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <Column style={styles.container}>
      <CustomHeader leftIcon={Icons.backIcon} onLeftPress={onPressBack} />
      <ScrollContainer
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
        <Row style={styles.connectorView}>
          <Row style={{ alignItems: 'center' }}>
            {currentStep === 1 ? <SvgIcon.one /> : <SvgIcon.checked />}
            <Text style={[typography.body, styles.connectorText]}>
              {CommonStrings.email}
            </Text>
            <SvgIcon.connector />
          </Row>
          <Row style={{ alignItems: 'center' }}>
            <SvgIcon.two style={{ marginLeft: normalize(8) }} />
            <Text style={[typography.body, styles.connectorText]}>
              {CommonStrings.password}
            </Text>
          </Row>
        </Row>
        {currentStep === 1 ? (
          <CustomInput
            value={email}
            maxLength={320}
            autoFocus={true}
            isError={emailError}
            returnKeyType='next'
            label={CommonStrings.email}
            onChangeText={onChangeEmail}
            keyboardType='email-address'
            placeholder={CommonStrings.email}
          />
        ) : (
          <CustomInput
            maxLength={25}
            value={password}
            returnKeyType='next'
            isError={passwordError}
            keyboardType='ascii-capable'
            onChangeText={onEnterPassword}
            label={CommonStrings.password}
            placeholder={CommonStrings.password}
          />
        )}
        <PrimaryButton
          disabled={!isNextDisabled()}
          title={currentStep == 1 ? CommonStrings.next : CommonStrings.Continue}
          onPress={onPressNext}
        />
        <Touchable onPress={onPressForgot}>
          <Text style={[typography.body, styles.forgot]}>
            {CommonStrings.forgotPassword}
          </Text>
        </Touchable>
        <Column style={styles.registerView}>
          <Text style={[typography.body, styles.dontHaveAccount]}>
            {CommonStrings.dontHaveAccount}

            <Text
              onPress={onPressRegister}
              style={[typography.body, styles.underlineText]}>
              {CommonStrings.registerHere}
            </Text>
          </Text>
        </Column>
      </ScrollContainer>
    </Column>
  );
};

export default Login;
