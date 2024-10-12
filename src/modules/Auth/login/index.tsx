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
import { goBack, navigate } from '@inspectreplyai/utils/navigationUtils';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { loginUser } from '@inspectreplyai/redux/auth/action';
import { RootState } from '@inspectreplyai/redux/Store';
import { isIOS } from '@inspectreplyai/utils/platform';
const Login = () => {
  const [state, updateState] = useSimpleReducer({
    currentStep: 1,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    showPassword: false,
  });

  const {
    currentStep,
    email,
    emailError,
    password,
    passwordError,
    showPassword,
  } = state;
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.AuthSlice);

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

  const validateAndUpdateState = (
    field: string,
    value: string,
    validationFn: (input: string, error: string) => { errorMsg: string },
    errormessage: string,
  ) => {
    const error = validationFn(value.trim(), errormessage).errorMsg;
    updateState({
      [field]: value.trim(),
      [`${field}Error`]: error,
    });
    return error;
  };

  const onChangeEmail = (email: string) => {
    updateState({
      email,
      emailError: '',
    });
  };

  const handleEmailValidation = () => {
    return validateAndUpdateState(
      'email',
      email,
      emailValidation,
      email.length == 0
        ? CommonStrings.pleaseEnterYourEmail
        : CommonStrings.pleaseCheckYourEntry,
    );
  };

  const handlePasswordValidation = () => {
    return validateAndUpdateState(
      'password',
      password,
      passwordValidation,
      password.length == 0
        ? CommonStrings.pleaseEnterYourPassword
        : CommonStrings.pleaseCheckYourEmailAndPassword,
    );
  };

  const onEnterPassword = (password: string) => {
    updateState({
      password,
      passwordError: '',
    });
  };

  const onPressNext = () => {
    let emailError = '',
      passwordError = '';

    if (currentStep === 1) {
      emailError = handleEmailValidation();
    } else if (currentStep === 2) {
      passwordError = handlePasswordValidation();
    }

    if (emailError || passwordError) {
      return;
    }

    if (currentStep === 1 && email && !emailError) {
      updateState({
        currentStep: 2,
      });
    } else if (currentStep === 2 && password && !passwordError) {
      dispatch(loginUser({ email: email?.toLowerCase(), password }));
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
        keyboardShouldPersistTaps='always'
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
            autoCapitalize='none'
            onChangeText={onChangeEmail}
            keyboardType='email-address'
            secureTextEntry={false}
            placeholder={CommonStrings.email}
            onBlur={() => handleEmailValidation()}
            onSubmitEditing={onPressNext}
          />
        ) : (
          <CustomInput
            key={`password-${showPassword}`}
            maxLength={25}
            value={password}
            isError={passwordError}
            autoFocus={true}
            returnKeyType={'done'}
            returnKeyLabel={isIOS ? 'done' : 'submit'}
            onChangeText={onEnterPassword}
            onBlur={() => handlePasswordValidation()}
            label={CommonStrings.password}
            placeholder={CommonStrings.password}
            onSubmitEditing={onPressNext}
            RightIcon={!showPassword ? SvgIcon.Eye : SvgIcon.CloseEye}
            secureTextEntry={!showPassword}
            onRightIconPress={() =>
              updateState({ showPassword: !showPassword })
            }
          />
        )}
        <PrimaryButton
          title={CommonStrings.Continue}
          onPress={onPressNext}
          loading={loading}
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

export default React.memo(Login);
