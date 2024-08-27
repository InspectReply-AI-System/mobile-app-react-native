import { Text } from 'react-native';
import React, { useState } from 'react';

import Column from '@inspectreplyai/components/general/Column';
import CustomHeader from '@inspectreplyai/components/header';
import { typography } from '@inspectreplyai/themes';
import BackIcon from '@inspectreplyai/assets/svg/backIcon.svg';
import { CommonStrings } from '@inspectreplyai/utils';
import Upload from '@inspectreplyai/assets/svg/Upload.svg';
import Touchable from '@inspectreplyai/components/general/Touchable';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import Row from '@inspectreplyai/components/general/Row';
import Check from '@inspectreplyai/assets/svg/checkBoxSelectionIcon.svg';
import Uncheck from '@inspectreplyai/assets/svg/checkBoxIcon.svg';
import { styles } from './style';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import DocumentPicker from 'react-native-document-picker';
import PdfName from '@inspectreplyai/assets/svg/pdfName.svg';
import Cross from '@inspectreplyai/assets/svg/cross.svg';

const AddReports = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const toggleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      setSelectedPdf(doc[0]?.name || null);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.log('Document picker error: ', err);
      }
    }
  };

  const removePdf = () => {
    setSelectedPdf(null);
  };

  return (
    <Column style={styles.mainContainer}>
      <CustomHeader title={CommonStrings.addReport} leftIcon={<BackIcon />} />
      <Column style={styles.subContainer}>
        {selectedPdf ? (
          <Column>
            <Row style={styles.pdfNameContainer}>
              <Row style={styles.pdfNameSubContainer}>
                <PdfName />
                <Text
                  style={[typography.h5, styles.uploadPdfText]}
                  numberOfLines={1}>
                  {selectedPdf}
                </Text>
              </Row>
              <Touchable onPress={removePdf} hitSlop={5}>
                <Cross />
              </Touchable>
            </Row>
            <Text style={[typography.body, styles.clickUploadText]}>
              {CommonStrings.needChangePdfNote}
            </Text>
          </Column>
        ) : (
          <Touchable style={styles.uploadContainer} onPress={selectDoc}>
            <Upload />
            <Text style={[typography.h6, styles.uploadText]}>
              {CommonStrings.uploadFile}
            </Text>
          </Touchable>
        )}
        {!selectedPdf && (
          <Text style={[typography.h6, styles.clickUploadText]}>
            {CommonStrings.uploadPdf}
          </Text>
        )}
      </Column>
      <Column style={styles.bottomContainer}>
        {!isChecked && (
          <>
            <Row style={styles.checkContainer}>
              <Touchable onPress={toggleCheckBox}>
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
              containerStyle={styles.generateButtonStyle}
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
          onPress={() => {
            navigate(ROUTES.PROCESSREPORT);
          }}
          disabled={!selectedPdf}
        />
      </Column>
    </Column>
  );
};

export default AddReports;
