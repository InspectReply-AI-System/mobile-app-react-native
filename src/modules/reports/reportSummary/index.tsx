import { Text } from 'react-native';
import React from 'react';
import CustomHeader from '@inspectreplyai/components/header';
import { Icons, SvgIcon } from '@inspectreplyai/themes/appImages';
import Column from '@inspectreplyai/components/general/Column';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { CommonFunctions, CommonStrings } from '@inspectreplyai/utils';
import { navigate, reset } from '@inspectreplyai/utils/navigationUtils';
import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import Svg from '@inspectreplyai/components/general/Svg';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ReportDetail, RouteParams } from './@types';

const ReportSummary = () => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const paramData = route.params as RouteParams;

  const reportSummary: ReportDetail = paramData?.reportDetail;

  const onPressAccessFullReport = () => {
    navigate(ROUTES.CHECKOUTSCREEN);
  };

  const onPressCancel = () => {
    reset(ROUTES.BOTTOMTAB);
  };
  return (
    <>
      <CustomHeader
        title={CommonStrings.reportSummary}
        leftIcon={Icons.backIcon}
        onLeftPress={onPressCancel}
      />
      <Column style={styles.mainView}>
        <Column style={styles.subView}>
          <Column style={styles.reportSvgView}>
            <Svg Component={SvgIcon.ReportIcon} imageStyle={styles.iconStyle} />
          </Column>
          <Column style={styles.textView1}>
            <Text style={styles.numberTxt}>
              {reportSummary?.contractors?.length < 10
                ? reportSummary?.contractors?.length == 0
                  ? 0
                  : '0' + reportSummary?.contractors?.length
                : reportSummary?.contractors?.length}
            </Text>
            <Text style={styles.contractorTxt}>
              {CommonStrings.contractorRecommended}
            </Text>
            <Text style={styles.accessFullReportTxt}>
              {CommonStrings.accessReport}
            </Text>
          </Column>
        </Column>
        <Column style={styles.subView1}>
          <Column style={styles.textView2}>
            <Text style={styles.purchasePrizeTxt}>
              {CommonFunctions.formatCurrency(reportSummary?.estimated_price)}
            </Text>
            <Text style={styles.estimatedTxt}>
              {CommonStrings.estimatedCost}
            </Text>
          </Column>
          <Column style={styles.dollarView}>
            <Svg Component={SvgIcon.Dollar} imageStyle={styles.iconStyle} />
          </Column>
        </Column>
        <PrimaryButton
          title={CommonStrings.accessFullReport}
          onPress={onPressAccessFullReport}
        />
        <PrimaryButton
          title={CommonStrings.cancel}
          onPress={onPressCancel}
          containerStyle={styles.cancelBtnStyle}
        />
      </Column>
    </>
  );
};

export default ReportSummary;
