import React from 'react';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonStrings } from '@inspectreplyai/utils';
import { useSimpleReducer } from '@inspectreplyai/hooks';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { Icons, Images } from '@inspectreplyai/themes/appImages';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { emailValidation } from '@inspectreplyai/utils/validatorsUtils';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import { resetPassword } from '@inspectreplyai/network/authApis';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';

const ForgotPassword = () => {
  const [state, updateState] = useSimpleReducer({
    email: '',
    emailError: '',
    loading: false,
  });
  const { email, emailError } = state;

  const validateAndUpdateState = (
    field: string,
    value: string,
    validationFn: (input: string, error: string) => { errorMsg: string },
  ) => {
    const error = validationFn(
      value,
      value.length == 0
        ? CommonStrings.pleaseEnterYourEmailToResetPassword
        : CommonStrings.pleaseCheckYourEntryMustBeValidEmail,
    ).errorMsg;
    updateState({
      [field]: value,
      [`${field}Error`]: error,
    });
  };

  const onEnterEmail = (email: string) => {
    validateAndUpdateState('email', email.trim(), emailValidation);
  };

  const isContinueButtonEnabled = () => {
    return email && !emailError;
  };

  const onPressContinue = async () => {
    onEnterEmail(email);
    if (!isContinueButtonEnabled()) return;
    try {
      updateState({ loading: true });
      const result = await resetPassword({ email: email.toLowerCase() });
      showSuccessToast(result?.data?.msg);
      updateState({ loading: false });
      navigate(ROUTES.VERIFYCODE, { email });
    } catch (error: any) {
      showErrorToast(error);
      updateState({ loading: false });
    }
  };
  return (
    <Column style={styles.container}>
      <CustomHeader
        leftIcon={Icons.backIcon}
        title={CommonStrings.resetPassword}
      />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='always'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
        <Column style={styles.innerContainer}>
          <CustomInput
            label={CommonStrings.email}
            placeholder={CommonStrings.emailExample}
            keyboardType='email-address'
            autoFocus
            returnKeyType='done'
            returnKeyLabel='Continue'
            maxLength={320}
            onChangeText={onEnterEmail}
            value={email}
            isError={emailError}
            onBlur={() => onEnterEmail(email)}
            autoCapitalize='none'
            onSubmitEditing={onPressContinue}
          />

          <PrimaryButton
            disabled={!email}
            title={CommonStrings.Continue}
            onPress={onPressContinue}
            loading={state.loading}
          />
        </Column>
      </ScrollContainer>
    </Column>
  );
};

export default ForgotPassword;
