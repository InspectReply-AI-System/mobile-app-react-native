import { Text } from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { ProcessReportRouteProp } from '../@types';
import { typography } from '@inspectreplyai/themes';
import { useRoute } from '@react-navigation/native';
import { CommonStrings } from '@inspectreplyai/utils';
import Loader from '@inspectreplyai/components/loader';
import { goBack, reset } from '@inspectreplyai/utils/navigationUtils';
import Column from '@inspectreplyai/components/general/Column';
import { generateReport } from '@inspectreplyai/network/reportsApi';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { setContentType } from '@inspectreplyai/network/networkServices';
import { showErrorToast } from '@inspectreplyai/components/toast';

const ProcessReport = () => {
  const route = useRoute<ProcessReportRouteProp>();
  const params = route.params;
  const { user } = useAppSelector((store) => store.AuthSlice);

  const generateNewReport = async () => {
    const pdfFile = params?.pdfDetails[0];

    if (!pdfFile || !user) {
      console.error('Missing required data for report generation');
      return;
    }

    try {
      await generateReport({
        report_file: {
          uri: pdfFile?.uri,
          name: pdfFile?.name,
          type: pdfFile.type,
        },
        customerId: user.userId,
        ...(params.isChecked && { contractors: params?.contractors || [] }),
      });
      setContentType(null);
    } catch (error: any) {
      setContentType(null);
      showErrorToast(error);
      goBack();
    }
  };

  useEffect(() => {
    generateNewReport();
  }, []);

  return (
    <Column style={styles.container}>
      <Loader />
      <Text style={[typography.body, styles.text1]}>
        {CommonStrings.reportPdfText1}
      </Text>
      <Text style={[typography.body, styles.text2]}>
        {CommonStrings.reportPdfText2}
      </Text>
      <Column style={styles.btnContainer}>
        <PrimaryButton
          title='Ok'
          onPress={() => {
            reset(ROUTES.BOTTOMTAB);
          }}
        />
      </Column>
    </Column>
  );
};

export default ProcessReport;
