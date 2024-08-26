import { Text } from 'react-native';
import React, { useState } from 'react';
import Column from '@inspectreplyai/components/general/Column';
import CustomHeader from '@inspectreplyai/components/header';
import { colors, typography } from '@inspectreplyai/themes';
import BackIcon from '@inspectreplyai/assets/svg/backIcon.svg';
import { CommonStrings } from '@inspectreplyai/utils';
import Upload from '@inspectreplyai/assets/svg/Upload.svg';
import Touchable from '@inspectreplyai/components/general/Touchable';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import Row from '@inspectreplyai/components/general/Row';
import Check from '@inspectreplyai/assets/svg/checkBoxSelectionIcon.svg';
import Uncheck from '@inspectreplyai/assets/svg/checkBoxIcon.svg';
import { styles } from './style';

const AddReports = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Column style={styles.mainContainer}>
      <CustomHeader title={CommonStrings.addReport} leftIcon={<BackIcon />} />
      <Column style={styles.subContainer}>
        <Touchable style={styles.uploadContainer} onPress={() => {}}>
          <Upload />
          <Text style={[typography.h6, styles.uploadText]}>
            {CommonStrings.uploadFile}
          </Text>
        </Touchable>
        <Text style={[typography.h6, styles.clickUploadText]}>
          {CommonStrings.uploadPdf}
        </Text>
      </Column>
      <Column style={styles.bottomContainer}>
        {!isChecked && (
          <>
            <Row style={styles.checkContainer}>
              <Touchable onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? <Check /> : <Uncheck />}
              </Touchable>
              <Text style={[typography.h6, styles.usePreferredText]}>
                {CommonStrings.useContractor}
              </Text>
            </Row>
            <Text style={[typography.subBody, styles.noteText]}>
              {CommonStrings.noteWhenSelected}
            </Text>
          </>
        )}
        {isChecked && (
          <>
            <PrimaryButton
              containerStyle={{
                backgroundColor: colors.primaryBalck,
                borderWidth: 1,
                borderColor: colors.primaryBlue,
              }}
              title={CommonStrings.preferredContractor}
              onPress={() => {}}
            />
            <Text style={[typography.h6, styles.reportGenerateText]}>
              {CommonStrings.reportGenerated}
            </Text>
          </>
        )}

        <PrimaryButton
          title={CommonStrings.generateReport}
          onPress={() => {}}
        />
      </Column>
    </Column>
  );
};

export default AddReports;
