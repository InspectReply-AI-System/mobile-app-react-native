import { Text } from 'react-native';
import React, { useEffect } from 'react';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { ProcessReportRouteProp } from '../@types';
import { typography } from '@inspectreplyai/themes';
import { useRoute } from '@react-navigation/native';
import { CommonStrings } from '@inspectreplyai/utils';
import Loader from '@inspectreplyai/components/loader';
import Column from '@inspectreplyai/components/general/Column';
import { showErrorToast } from '@inspectreplyai/components/toast';
import { reportSummary } from '@inspectreplyai/network/reportsApi';
import { navigate, reset } from '@inspectreplyai/utils/navigationUtils';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';

const ProcessReport = () => {
  const route = useRoute<ProcessReportRouteProp>();
  const params = route.params;

  const onPressFullReport = async () => {
    try {
      const result = await reportSummary(params.report_id);
      navigate(ROUTES.REPORTSUMMARY, { reportDetail: result.data.report });
    } catch (error: any) {
      if (error !== 'Processing report.') showErrorToast(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await onPressFullReport();
    }, 60000); // Retry every 1 minute

    // Initial call
    onPressFullReport();

    // Cleanup interval on component unmount or success
    return () => clearInterval(intervalId);
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
