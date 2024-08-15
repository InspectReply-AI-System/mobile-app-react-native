import React from 'react';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonStrings } from '@inspectreplyai/utils';
import { isIOS } from '@inspectreplyai/utils/platform';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { useRefs, useSimpleReducer } from '@inspectreplyai/hooks';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { Icons, Images } from '@inspectreplyai/themes/appImages';
import { passwordValidation } from '@inspectreplyai/utils/validatorsUtils';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';

const SetPassword = () => {
  const { setRef, focusOnElement } = useRefs();

  const [state, updateState] = useSimpleReducer({
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: '',
  });
  const { password, confirmPassword, passwordError, confirmPasswordError } =
    state;

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
      password && confirmPassword && !passwordError && !confirmPasswordError
    );
  };

  const onPressContinue = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <Column style={styles.container}>
      <CustomHeader leftIcon={Icons.backIcon} title='Set New Password' />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.innerContainer}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />

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

        <PrimaryButton
          disabled={!isContinueButtonEnabled()}
          title={CommonStrings.Continue}
          onPress={onPressContinue}
        />
      </ScrollContainer>
    </Column>
  );
};

export default SetPassword;
