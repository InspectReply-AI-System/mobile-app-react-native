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
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import { Text } from 'react-native';
import { typography } from '@inspectreplyai/themes';
import TimerComponent from '@inspectreplyai/components/timerComponent';
import { verificationCodeValidation } from '@inspectreplyai/utils/validatorsUtils';
import { useRoute } from '@react-navigation/native';

const VerifyCode = () => {
  const params = useRoute().params;
  console.log('params verify', params);
  const [state, updateState] = useSimpleReducer({
    verificationCode: '',
    verificationCodeError: '',
  });
  const { verificationCode, verificationCodeError } = state;

  const onVerificationCode = (verificationCode: string) => {
    const error = verificationCodeValidation(verificationCode);
    updateState({
      verificationCode,
      verificationCodeError: error.errorMsg,
    });
  };

  const isContinueButtonEnabled = () => {
    return verificationCode && !verificationCodeError;
  };

  const onPressContinue = () => {
    navigate(ROUTES.SETPASSWORD, {
      email: params?.email,
      verifyCode: verificationCode,
    });
  };

  return (
    <Column style={styles.container}>
      <CustomHeader
        leftIcon={Icons.backIcon}
        title={CommonStrings.verifyCode}
      />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
        <Column style={styles.innerContainer}>
          <CustomInput
            label={CommonStrings.verifyCode}
            placeholder={CommonStrings.enterVerificationCode}
            autoFocus
            returnKeyType='done'
            returnKeyLabel='Continue'
            maxLength={10}
            onChangeText={onVerificationCode}
            value={verificationCode}
            isError={verificationCodeError}
          />
          <Text style={[typography.body, styles.emailVerificationText]}>
            {CommonStrings.checkEmailForVerification}
          </Text>
          <TimerComponent timer={60} />
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

export default VerifyCode;
