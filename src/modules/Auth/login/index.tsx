import { Alert, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Column from '@inspectreplyai/components/general/Column';
import CustomHeader from '@inspectreplyai/components/header';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings, normalize } from '@inspectreplyai/utils';
import { styles } from './styles';
import Row from '@inspectreplyai/components/general/Row';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { goBack, navigate } from '@inspectreplyai/utils/navigationUtils';
import Touchable from '@inspectreplyai/components/general/Touchable';
import ROUTES from '@inspectreplyai/routes/routes';

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(currentStep);
  }, [currentStep]);

  const onPressNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      navigate(ROUTES.SIGNUP);
    }
  };

  const onPressBack = () => {
    if (currentStep === 1) {
      goBack();
    } else {
      setCurrentStep(1);
    }
  };

  const onPressForgot = () => {
    navigate(ROUTES.FORGOTPASSWORD);
  };

  const onPressRegister = () => {
    navigate(ROUTES.SIGNUP);
  };
  return (
    <Column style={styles.container}>
      <CustomHeader leftIcon={Icons.backIcon} onLeftPress={onPressBack} />
      <ScrollContainer
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
            autoFocus={true}
            returnKeyType='next'
            onKeyPress={() => Alert.alert('lkjh')}
            label={CommonStrings.email}
            placeholder={CommonStrings.email}
          />
        ) : (
          <CustomInput
            label={CommonStrings.password}
            placeholder={CommonStrings.password}
          />
        )}
        <PrimaryButton
          disabled={false}
          title={CommonStrings.next}
          onPress={onPressNext}
        />
        <Touchable onPress={onPressForgot}>
          <Text style={[typography.body, styles.forgot]}>
            {CommonStrings.forgotPassword}
          </Text>
        </Touchable>
        <Column style={styles.registerView}>
          <Text style={[typography.body, styles.dontHaveAccount]}>
            {CommonStrings.dontHaveAccount}
            <Touchable onPress={onPressRegister}>
              <Text style={[typography.body, styles.underlineText]}>
                {CommonStrings.registerHere}
              </Text>
            </Touchable>
          </Text>
        </Column>
      </ScrollContainer>
    </Column>
  );
};

export default Login;
