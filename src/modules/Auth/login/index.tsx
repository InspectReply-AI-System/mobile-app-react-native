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
  });

  const { currentStep, email, emailError, password, passwordError } = state;
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
    validationFn: (input: string) => { errorMsg: string },
  ) => {
    const error = validationFn(value.trim()).errorMsg;
    updateState({
      [field]: value,
      [`${field}Error`]: error,
    });
  };

  const onChangeEmail = (email: string) => {
    validateAndUpdateState('email', email, emailValidation);
  };

  const onEnterPassword = (password: string) => {
    validateAndUpdateState('password', password, passwordValidation);
  };

  const onPressNext = () => {
    if (currentStep === 1 && email && !emailError) {
      updateState({
        currentStep: 2,
      });
    } else if (currentStep === 2 && password && !passwordError) {
      dispatch(loginUser({ email: email?.toLowerCase(), password }));
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
            onChangeText={onChangeEmail}
            keyboardType='email-address'
            placeholder={CommonStrings.email}
            onBlur={() => onChangeEmail(email)}
            onSubmitEditing={onPressNext}
          />
        ) : (
          <CustomInput
            maxLength={25}
            value={password}
            isError={passwordError}
            keyboardType='ascii-capable'
            returnKeyType={'done'}
            returnKeyLabel={isIOS ? 'done' : 'submit'}
            onChangeText={onEnterPassword}
            onBlur={() => onEnterPassword(password)}
            label={CommonStrings.password}
            placeholder={CommonStrings.password}
            onSubmitEditing={onPressNext}
          />
        )}
        <PrimaryButton
          disabled={!isNextDisabled()}
          title={currentStep == 1 ? CommonStrings.next : CommonStrings.Continue}
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

export default Login;
