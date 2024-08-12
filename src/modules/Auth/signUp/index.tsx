import { Text } from 'react-native';
import React from 'react';

import { styles } from './styles';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import Row from '@inspectreplyai/components/general/Row';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import ImageWrapper from '@inspectreplyai/components/general/Image';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { Icons, Images, SvgIcon } from '@inspectreplyai/themes/appImages';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import ScrollContainer from '@inspectreplyai/components/general/ScrollContainer';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';

const SignUp = () => {
  const [checked, setChecked] = React.useState(false);

  const onPressCheckButton = () => {
    setChecked(!checked);
  };
  return (
    <Column style={styles.container}>
      <CustomHeader leftIcon={Icons.backIcon} />
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        style={styles.innerContainer}>
        <ImageWrapper source={Images.appIcon} style={styles.imageStyle} />
        <Text style={[typography.h2, styles.welcomeHeading]}>
          {CommonStrings.signUp}
        </Text>

        <CustomInput
          label={CommonStrings.firstName}
          placeholder={CommonStrings.firstName}
        />
        <CustomInput
          label={CommonStrings.lastName}
          placeholder={CommonStrings.lastName}
        />
        <CustomInput
          label={CommonStrings.email}
          placeholder={CommonStrings.emailExample}
        />
        <CustomInput
          label={CommonStrings.password}
          placeholder={CommonStrings.password}
        />
        <CustomInput
          label={CommonStrings.confirmPassword}
          placeholder={CommonStrings.confirmPassword}
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
          disabled={false}
          title={CommonStrings.Continue}
          onPress={() => {}}
        />
        <Text style={[typography.body, styles.signIntext]}>
          {CommonStrings.alreadyAccount}
          <Text style={[styles.signIntext, styles.underlineText]}>
            {CommonStrings.signIn}
          </Text>
        </Text>
      </ScrollContainer>
    </Column>
  );
};

export default SignUp;
