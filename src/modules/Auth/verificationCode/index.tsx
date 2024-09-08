import React from 'react';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonFunctions, CommonStrings } from '@inspectreplyai/utils';
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
import { resetPassword, verifyOtp } from '@inspectreplyai/network/authApis';

const VerifyCode = () => {
  const params = useRoute().params;

  const [state, updateState] = useSimpleReducer({
    verificationCode: '',
    verificationCodeError: '',
    loading: false,
  });
  const { verificationCode, verificationCodeError, loading } = state;

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

  const onPressContinue = async () => {
    if (!isContinueButtonEnabled()) return;

    updateState({ loading: true });
    let body = {
      email: params?.email,
      otp: verificationCode,
    };
    try {
      const result = await verifyOtp(body);
      updateState({ loading: false });
      CommonFunctions.showSnackbar(result?.data?.msg);
      navigate(ROUTES.SETPASSWORD, body);
    } catch (error) {
      CommonFunctions.showSnackbar(error);
      updateState({ loading: false });
    }
  };

  const onPressResendCode = async () => {
    try {
      const result = await resetPassword({
        email: params?.email.toLowerCase(),
      });

      CommonFunctions.showSnackbar(result?.data?.msg);
    } catch (error: any) {
      CommonFunctions.showSnackbar(error);
    }
  };

  return (
    <Column style={styles.container}>
      <CustomHeader
        leftIcon={Icons.backIcon}
        title={CommonStrings.verifyCode}
      />
      <ScrollContainer
        keyboardDismissMode='interactive'
        keyboardShouldPersistTaps='always'
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
            onSubmitEditing={onPressContinue}
            autoCapitalize='none'
            onBlur={() => onVerificationCode(verificationCode)}
          />
          <Text style={[typography.body, styles.emailVerificationText]}>
            {CommonStrings.checkEmailForVerification}
          </Text>
          <TimerComponent timer={60} onPressResend={onPressResendCode} />
          <PrimaryButton
            loading={loading}
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
