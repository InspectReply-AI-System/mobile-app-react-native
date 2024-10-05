import React from 'react';
import styles from './styles';
import { CommonStrings } from '@inspectreplyai/utils';
import { RootState } from '@inspectreplyai/redux/Store';
import CustomHeader from '@inspectreplyai/components/header';
import { goBack } from '@inspectreplyai/utils/navigationUtils';
import Column from '@inspectreplyai/components/general/Column';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import { useRefs, useSimpleReducer } from '@inspectreplyai/hooks';
import { changeUserPassword } from '@inspectreplyai/network/authApis';
import { passwordValidation } from '@inspectreplyai/utils/validatorsUtils';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import PasswordValidation from '@inspectreplyai/components/passwordValidation';
import CustomProfileInput from '@inspectreplyai/components/textInputs/profileInput';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { SvgIcon } from '@inspectreplyai/themes/appImages';

const Password = () => {
  const { setRef, focusOnElement } = useRefs();
  const [state, updateState] = useSimpleReducer({
    isLoading: false,
    oldPassword: '',
    newPassword: '',
    oldPasswordError: '',
    newPasswordError: '',
    showOldPassowrd: false,
    showNewPassword: false,
    selectedfield: 1,
  });
  const { user } = useAppSelector((store: RootState) => store.AuthSlice);

  const {
    oldPassword,
    oldPasswordError,
    newPasswordError,
    newPassword,
    isLoading,
    showOldPassowrd,
    showNewPassword,
    selectedfield,
  } = state;

  const onChangeOldPassword = (_password: string) => {
    const passwordError = passwordValidation(
      _password.trim(),
      CommonStrings.passwordMeetsCriteria,
    ).errorMsg;
    updateState({
      oldPassword: _password.trim(),
      oldPasswordError: passwordError,
    });
  };
  const onChangeNewPassword = (_password: string) => {
    const passwordError = passwordValidation(
      _password.trim(),
      CommonStrings.passwordMeetsCriteria,
    ).errorMsg;
    updateState({
      newPassword: _password.trim(),
      newPasswordError: passwordError,
    });
  };

  const updatePassword = async () => {
    try {
      updateState({ isLoading: true });
      const response = await changeUserPassword({
        cust_id: user?.userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      if (response) {
        showSuccessToast(response?.data?.message);
        updateState({ isLoading: false });
        goBack();
      }
    } catch (error: any) {
      showErrorToast(error);
      updateState({ isLoading: false });
    }
  };

  const onPressConfirm = async () => {
    if (oldPassword === newPassword) {
      showErrorToast(CommonStrings.passwordCannotBeSame);
    } else {
      updatePassword();
    }
  };

  const onPressCancel = () => {
    goBack();
  };

  const isContinueButtonEnabled = () => {
    return oldPassword && newPassword && !oldPasswordError && !newPasswordError;
  };

  const onPressDoneButton = () => {
    if (oldPassword === newPassword) {
      showErrorToast(CommonStrings.passwordCannotBeSame);
    } else if (isContinueButtonEnabled()) {
      updatePassword();
    }
  };

  return (
    <Column style={styles.container}>
      <CustomHeader
        onPressRightLabel={onPressCancel}
        title={CommonStrings.myProfile}
        rightLabel={CommonStrings.cancel}
      />
      <Column style={styles.inputsContainer}>
        <CustomProfileInput
          maxLength={25}
          autoFocus={true}
          value={oldPassword}
          returnKeyType='next'
          isError={oldPasswordError}
          label={CommonStrings.oldPassword}
          onChangeText={onChangeOldPassword}
          inputCustomStyle={styles.inputStyle}
          onFocus={() => {
            updateState({ selectedfield: 2 });
          }}
          ref={setRef(CommonStrings.oldPassword)}
          onBlur={() => onChangeOldPassword(oldPassword)}
          onSubmitEditing={() => {
            focusOnElement(CommonStrings.newPassword);
          }}
          touched
          secureTextEntry={!showOldPassowrd}
          icon={!showOldPassowrd ? SvgIcon.Eye : SvgIcon.CloseEye}
          onPressRightIcon={() =>
            updateState({ showOldPassowrd: !showOldPassowrd })
          }
        />
        <CustomProfileInput
          maxLength={25}
          value={newPassword}
          returnKeyType='done'
          isError={newPasswordError}
          label={CommonStrings.newPassword}
          onSubmitEditing={onPressDoneButton}
          onChangeText={onChangeNewPassword}
          onFocus={() => {
            updateState({ selectedfield: 1 });
          }}
          inputCustomStyle={styles.inputStyle}
          ref={setRef(CommonStrings.newPassword)}
          onBlur={() => onChangeNewPassword(newPassword)}
          icon={!showNewPassword ? SvgIcon.Eye : SvgIcon.CloseEye}
          touched
          secureTextEntry={!showNewPassword}
          onPressRightIcon={() =>
            updateState({ showNewPassword: !showNewPassword })
          }
        />
        <PasswordValidation
          value={selectedfield == 1 ? newPassword : oldPassword}
        />
        <PrimaryButton
          loading={isLoading}
          onPress={onPressConfirm}
          disabled={!isContinueButtonEnabled()}
          title={CommonStrings.confirmChanges}
        />
      </Column>
    </Column>
  );
};

export default Password;
