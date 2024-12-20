import { Text } from 'react-native';
import React, { useCallback } from 'react';

import Column from '@inspectreplyai/components/general/Column';
import CustomHeader from '@inspectreplyai/components/header';
import { typography } from '@inspectreplyai/themes';
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
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import PdfName from '@inspectreplyai/assets/svg/pdfName.svg';
import Cross from '@inspectreplyai/assets/svg/cross.svg';
import { useSimpleReducer } from '@inspectreplyai/hooks';
import { preferredContractor } from '@inspectreplyai/network/contractorAPis';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import { showErrorToast } from '@inspectreplyai/components/toast';
import CustomLoader from '@inspectreplyai/components/loader/customLoader';
import { useFocusEffect } from '@react-navigation/native';
import { Icons } from '@inspectreplyai/themes/appImages';
import { generateReport } from '@inspectreplyai/network/reportsApi';
import { setContentType } from '@inspectreplyai/network/networkServices';

const AddReports = () => {
  const { user } = useAppSelector((store) => store.AuthSlice);
  const [state, updateState] = useSimpleReducer({
    isChecked: false,
    selectedPdf: null,
    isPreferredContractor: false,
    contractors: [],
    loader: false,
  });
  const { isChecked, selectedPdf, isPreferredContractor, loader, contractors } =
    state;
  const toggleCheckBox = () => {
    updateState({ isChecked: !isChecked });
  };

  const selectDoc = async () => {
    try {
      const doc: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });

      if (doc && doc.length > 0 && doc[0]?.size > 5000010) {
        showErrorToast(CommonStrings.largeFileSize);
        return;
      }
      updateState({ selectedPdf: doc || null });
    } catch (err) {
      /* empty */
    }
  };

  const removePdf = () => {
    updateState({ selectedPdf: null });
  };

  const getPreferredContractor = async () => {
    updateState({ loader: true });
    try {
      const response = await preferredContractor({
        cust_id: user.userId,
      });
      updateState({
        isPreferredContractor: response?.data?.length > 0 ? true : false,
        contractors: response?.data || [],
      });
      updateState({ loader: false });
    } catch (error: any) {
      showErrorToast(error);
      updateState({ loader: false });
    }
  };
  useFocusEffect(
    useCallback(() => {
      getPreferredContractor();
    }, []),
  );

  const generateNewReport = async () => {
    const pdfFile = selectedPdf[0];

    if (!pdfFile || !user) {
      return;
    }
    updateState({ loader: true });
    try {
      const result = await generateReport({
        report_file: {
          uri: pdfFile?.uri,
          name: pdfFile?.name,
          type: pdfFile.type,
        },
        customerId: user.userId,
        ...(isChecked && { contractors: contractors || [] }),
      });
      setContentType(null);
      updateState({ loader: false });
      navigate(ROUTES.PROCESSREPORT, { report_id: result?.data?.report?.id });
    } catch (error: any) {
      setContentType(null);
      updateState({ loader: false });
      showErrorToast(error);
    }
  };
  const onPressGenerateReport = () => {
    if (!selectedPdf) {
      showErrorToast(CommonStrings.selectPdfFile);
      return;
    }
    generateNewReport();
  };
  return (
    <Column style={styles.mainContainer}>
      <CustomHeader title={CommonStrings.addReport} leftIcon={Icons.backIcon} />
      <Column style={styles.subContainer}>
        {selectedPdf ? (
          <Column>
            <Row style={styles.pdfNameContainer}>
              <Row style={styles.pdfNameSubContainer}>
                <PdfName />
                <Text
                  style={[typography.h5, styles.uploadPdfText]}
                  numberOfLines={1}>
                  {selectedPdf[0]?.name}
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
        {isPreferredContractor ? (
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
        ) : (
          <>
            <PrimaryButton
              containerStyle={styles.generateButtonStyle}
              title={CommonStrings.preferredContractor}
              onPress={() => {
                navigate(ROUTES.CONTRACTORSDETAILS, { isNew: true });
              }}
            />
            <Text style={[typography.h6, styles.reportGenerateText]}>
              {CommonStrings.reportGenerated}
            </Text>
          </>
        )}

        <PrimaryButton
          title={CommonStrings.generateReport}
          onPress={onPressGenerateReport}
        />
      </Column>
      {loader && <CustomLoader customContainerStyle={styles.loaderStyle} />}
    </Column>
  );
};

export default AddReports;
