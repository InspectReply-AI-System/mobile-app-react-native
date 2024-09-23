import React from 'react';

import { styles } from './styles';
import { CommonStrings } from '@inspectreplyai/utils';
import { isIOS } from '@inspectreplyai/utils/platform';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { useRefs, useSimpleReducer } from '@inspectreplyai/hooks';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import { passwordValidation } from '@inspectreplyai/utils/validatorsUtils';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import { useRoute } from '@react-navigation/native';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import { setNewPassword } from '@inspectreplyai/network/authApis';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';

const SetPassword = () => {
  const params: any = useRoute()?.params;

  const { setRef, focusOnElement } = useRefs();

  const [state, updateState] = useSimpleReducer({
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: '',
    loading: false,
    showPassword: false,
    showConfirmPassword: false,
  });
  const {
    password,
    confirmPassword,
    passwordError,
    confirmPasswordError,
    showPassword,
    showConfirmPassword,
  } = state;

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

  const onPressContinue = async () => {
    if (!isContinueButtonEnabled()) return;
    const payload = {
      email: params?.email,
      newPassword: password,
    };
    updateState({ loading: true });
    try {
      const result = await setNewPassword(payload);
      showSuccessToast(result?.data?.msg);
      updateState({ loading: false });
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      showErrorToast(error);
      updateState({ loading: false });
    }
  };
  return (
    <Column style={styles.container}>
      <CustomHeader leftIcon={Icons.backIcon} title='Set New Password' />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='always'
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
          onBlur={() => onEnterPassword(password)}
          RightIcon={!showPassword ? SvgIcon.Eye : SvgIcon.CloseEye}
          secureTextEntry={!showPassword}
          onRightIconPress={() => updateState({ showPassword: !showPassword })}
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
          onBlur={() => onEnterConfirmPassword(confirmPassword)}
          onSubmitEditing={onPressContinue}
          value={confirmPassword}
          isError={confirmPasswordError}
          RightIcon={!showConfirmPassword ? SvgIcon.Eye : SvgIcon.CloseEye}
          secureTextEntry={!showConfirmPassword}
          onRightIconPress={() =>
            updateState({ showConfirmPassword: !showConfirmPassword })
          }
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
