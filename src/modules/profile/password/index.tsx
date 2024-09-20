import React from 'react';
import styles from './styles';
import { colors } from '@inspectreplyai/themes';
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
import PasswordValidation from '@inspectreplyai/modules/Auth/passwordValidation';
import CustomProfileInput from '@inspectreplyai/components/textInputs/profileInput';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';

const Password = () => {
  const { setRef, focusOnElement } = useRefs();
  const [state, updateState] = useSimpleReducer({
    isLoading: false,
    oldPassword: '',
    newPassword: '',
    oldPasswordError: '',
    newPasswordError: '',
  });
  const { user } = useAppSelector((store: RootState) => store.AuthSlice);

  const {
    oldPassword,
    oldPasswordError,
    newPasswordError,
    newPassword,
    isLoading,
  } = state;

  const onChangeOldPassword = (_password: string) => {
    const passwordError = passwordValidation(_password.trim()).errorMsg;
    updateState({
      oldPassword: _password,
      oldPasswordError: passwordError,
    });
  };
  const onChangeNewPassword = (_password: string) => {
    const passwordError = passwordValidation(_password.trim()).errorMsg;
    updateState({
      newPassword: _password,
      newPasswordError: passwordError,
    });
  };

  const onPressConfirm = async () => {
    if (oldPassword === newPassword) {
      showErrorToast(CommonStrings.passwordCannotBeSame);
    } else {
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
    }
  };

  const onPressCancel = () => {
    goBack();
  };

  const isContinueButtonEnabled = () => {
    return oldPassword && newPassword && !oldPasswordError && !newPasswordError;
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
          autoFocus={true}
          value={oldPassword}
          returnKeyType='next'
          isError={oldPasswordError}
          label={CommonStrings.oldPassword}
          onChangeText={onChangeOldPassword}
          ref={setRef(CommonStrings.oldPassword)}
          onBlur={() => onChangeOldPassword(oldPassword)}
          inputCustomStyle={{ backgroundColor: colors.black }}
          onSubmitEditing={() => {
            focusOnElement(CommonStrings.newPassword);
          }}
        />
        <CustomProfileInput
          value={newPassword}
          returnKeyType='done'
          isError={newPasswordError}
          label={CommonStrings.newPassword}
          onChangeText={onChangeNewPassword}
          ref={setRef(CommonStrings.newPassword)}
          onBlur={() => onChangeNewPassword(newPassword)}
          inputCustomStyle={{ backgroundColor: colors.black }}
        />
        {newPassword?.length > 0 && <PasswordValidation value={newPassword} />}
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
