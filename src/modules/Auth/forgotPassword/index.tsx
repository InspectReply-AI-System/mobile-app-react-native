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

const ForgotPassword = () => {
  const [state, updateState] = useSimpleReducer({
    email: '',
    emailError: '',
  });
  const { email, emailError } = state;

  const onEnterEmail = (email: string) => {
    const emailError = emailValidation(email.trim());
    updateState({
      email,
      emailError: emailError.errorMsg,
    });
  };

  const isContinueButtonEnabled = () => {
    return email && !emailError;
  };

  const onPressContinue = () => {
    navigate(ROUTES.VERIFYCODE);
  };
  return (
    <Column style={styles.container}>
      <CustomHeader
        leftIcon={Icons.backIcon}
        title={CommonStrings.resetPassword}
      />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
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
          />

          <PrimaryButton
            disabled={!isContinueButtonEnabled()}
            title={CommonStrings.Continue}
            onPress={onPressContinue}
          />
        </Column>
      </ScrollContainer>
    </Column>
  );
};

export default ForgotPassword;
