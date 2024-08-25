import { Text } from 'react-native';
import React from 'react';

import { styles } from './styles';
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from '@inspectreplyai/utils/validatorsUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import { isIOS } from '@inspectreplyai/utils/platform';
import Row from '@inspectreplyai/components/general/Row';
import CustomHeader from '@inspectreplyai/components/header';
import { InputFieldType } from '@inspectreplyai/utils/Enums';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { useRefs, useSimpleReducer } from '@inspectreplyai/hooks';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { registerUser } from '@inspectreplyai/redux/auth/action';
import { RootState } from '@inspectreplyai/redux/Store';

const SignUp = () => {
  const { setRef, focusOnElement } = useRefs();
  const [checked, setChecked] = React.useState(false);
  const { loading } = useAppSelector((store: RootState) => store.AuthSlice);

  const [state, updateState] = useSimpleReducer({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    confirmPasswordError,
  } = state;

  const dispatch = useAppDispatch();
  const onPressCheckButton = () => {
    setChecked(!checked);
  };

  const onEnterName = (name: string) => {
    const nameError = nameValidation(
      name.trimStart(),
      InputFieldType.FIRSTNAME,
    );
    updateState({
      firstName: name,
      firstNameError: nameError.errorMsg,
    });
  };
  const onEnterLastName = (lastName: string) => {
    const lastNameError = nameValidation(
      lastName.trimStart(),
      InputFieldType.LASTNAME,
    );
    updateState({
      lastName,
      lastNameError: lastNameError.errorMsg,
    });
  };
  const onEnterEmail = (email: string) => {
    const emailError = emailValidation(email.trim());
    updateState({
      email,
      emailError: emailError.errorMsg,
    });
  };
  const onEnterPassword = (password: string) => {
    const passwordError = passwordValidation(password.trim());
    let confirmPasswordError = '';
    if (
      confirmPassword.length > 0 &&
      confirmPassword.trim() !== password.trim()
    ) {
      confirmPasswordError = CommonStrings.passwordsMustMatch;
    } else {
      confirmPasswordError = '';
    }
    updateState({
      password,
      passwordError: passwordError.errorMsg,
      confirmPasswordError,
    });
  };
  const onEnterConfirmPassword = (confirmPassword: string) => {
    let confirmPasswordError = '';

    if (confirmPassword.trim() !== password.trim()) {
      confirmPasswordError = CommonStrings.passwordsMustMatch;
    } else {
      const validationError = passwordValidation(confirmPassword.trim());
      confirmPasswordError = validationError.errorMsg;
    }
    updateState({
      confirmPassword,
      confirmPasswordError,
    });
  };

  const isContinueButtonEnabled = () => {
    return (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      checked
    );
  };
  const onPressContinue = () => {
    dispatch(
      registerUser({
        first_name: firstName,
        last_name: lastName,
        email: email?.toLowerCase(),
        password,
        status: 1,
      }),
    );
  };
  const onPressSignIn = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <Column style={styles.container}>
      <CustomHeader leftIcon={Icons.backIcon} />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.innerContainer}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
        <Text style={[typography.h1, styles.welcomeHeading]}>
          {CommonStrings.signUp}
        </Text>

        <CustomInput
          label={CommonStrings.firstName}
          placeholder={CommonStrings.firstName}
          ref={setRef(CommonStrings.firstName)}
          onSubmitEditing={() => {
            focusOnElement(CommonStrings.lastName);
          }}
          autoFocus
          returnKeyType='next'
          maxLength={300}
          onChangeText={onEnterName}
          value={firstName}
          isError={firstNameError}
        />
        <CustomInput
          label={CommonStrings.lastName}
          placeholder={CommonStrings.lastName}
          ref={setRef(CommonStrings.lastName)}
          onSubmitEditing={() => {
            focusOnElement(CommonStrings.email);
          }}
          returnKeyType='next'
          maxLength={300}
          onChangeText={onEnterLastName}
          value={lastName}
          isError={lastNameError}
        />
        <CustomInput
          label={CommonStrings.email}
          placeholder={CommonStrings.emailExample}
          ref={setRef(CommonStrings.email)}
          keyboardType='email-address'
          onSubmitEditing={() => {
            focusOnElement(CommonStrings.password);
          }}
          returnKeyType='next'
          maxLength={320}
          onChangeText={onEnterEmail}
          value={email}
          isError={emailError}
        />
        <CustomInput
          label={CommonStrings.password}
          placeholder={CommonStrings.password}
          ref={setRef(CommonStrings.password)}
          onSubmitEditing={() => {
            focusOnElement(CommonStrings.confirmPassword);
          }}
          returnKeyType='next'
          maxLength={25}
          keyboardType='ascii-capable'
          onChangeText={onEnterPassword}
          value={password}
          isError={passwordError}
        />
        <CustomInput
          label={CommonStrings.confirmPassword}
          placeholder={CommonStrings.confirmPassword}
          ref={setRef(CommonStrings.confirmPassword)}
          returnKeyLabel={isIOS ? 'done' : 'submit'}
          returnKeyType={'done'}
          maxLength={25}
          keyboardType='ascii-capable'
          onChangeText={onEnterConfirmPassword}
          value={confirmPassword}
          isError={confirmPasswordError}
        />
        <Row style={styles.checkBoxView}>
          <Touchable onPress={onPressCheckButton}>
            {checked ? (
              <SvgIcon.SelectCheckBox />
            ) : (
              <SvgIcon.UnselectedCheckBox />
            )}
          </Touchable>
          <Text style={[typography.body, styles.iAcceptText]}>
            {CommonStrings.iaccept}
            <Text style={styles.underlineText}>
              {CommonStrings.termsAndConditions}
            </Text>
            &
            <Text style={styles.underlineText}>
              {CommonStrings.privacyPolicy}
            </Text>
          </Text>
        </Row>
        <PrimaryButton
          disabled={!isContinueButtonEnabled()}
          title={CommonStrings.Continue}
          onPress={onPressContinue}
          loading={loading}
        />
        <Text style={[typography.body, styles.signIntext]}>
          {CommonStrings.alreadyAccount}
          <Text
            onPress={onPressSignIn}
            style={[styles.signIntext, styles.underlineText]}>
            {CommonStrings.signIn}
          </Text>
        </Text>
      </ScrollContainer>
    </Column>
  );
};

export default SignUp;
