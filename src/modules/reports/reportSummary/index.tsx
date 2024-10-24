import { Text } from 'react-native';
import React from 'react';
import CustomHeader from '@inspectreplyai/components/header';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import { goBack, navigate } from '@inspectreplyai/utils/navigationUtils';
import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';

const ReportSummary = () => {
  return (
    <>
      <CustomHeader
        title={CommonStrings.reportSummary}
        leftIcon={<SvgIcon.BackIcon />}
      />
      <Column style={styles.mainView}>
        <Column style={styles.subView}>
          <Column style={styles.reportSvgView}>
            <SvgIcon.ReportIcon />
          </Column>
          <Column style={styles.textView1}>
            <Text style={[typography.h2, styles.numberTxt]}>{'06'}</Text>
            <Text style={[typography.h5, styles.contractorTxt]}>
              {CommonStrings.contractorRecommended}
            </Text>
            <Text style={[typography.subBody1, styles.accessFullReportTxt]}>
              {CommonStrings.accessReport}
            </Text>
          </Column>
        </Column>
        <Column style={styles.subView1}>
          <Column style={styles.textView2}>
            <Text style={[typography.h2, styles.purchasePrizeTxt]}>
              {'$1,600'}
            </Text>
            <Text style={[typography.h5, styles.estimatedTxt]}>
              {CommonStrings.estimatedCost}
            </Text>
          </Column>
          <Column style={styles.dollarView}>
            <SvgIcon.Dollar />
          </Column>
        </Column>
        <PrimaryButton
          title={CommonStrings.accessFullReport}
          onPress={() => {
            navigate(ROUTES.CHECKOUTSCREEN);
          }}
        />
        <PrimaryButton
          title={CommonStrings.cancel}
          onPress={() => {
            goBack();
          }}
          containerStyle={styles.cancelBtnStyle}
        />
      </Column>
    </>
  );
};

export default ReportSummary;
