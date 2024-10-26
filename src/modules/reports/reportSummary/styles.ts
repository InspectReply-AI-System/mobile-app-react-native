import { colors, typography } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  accessFullReportTxt: {
    ...typography.subBody1,
    marginTop: vh(12),
    alignSelf: 'center',
  },
  cancelBtnStyle: {
    backgroundColor: colors.primaryBlack,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
  },
  contractorTxt: { ...typography.h5, marginTop: vh(20), alignSelf: 'center' },
  dollarView: {
    position: 'absolute',
    bottom: vh(-32),
    alignSelf: 'center',
    zIndex: 1,
  },
  estimatedTxt: { ...typography.h5, marginTop: vh(18), alignSelf: 'center' },
  iconStyle: { height: vh(64), width: vw(64) },
  mainView: { paddingHorizontal: vw(16) },
  numberTxt: { ...typography.h2, alignSelf: 'center', marginTop: vh(40) },
  purchasePrizeTxt: {
    ...typography.h2,
    alignSelf: 'center',
    marginTop: vh(62),
  },
  reportSvgView: {
    position: 'absolute',
    top: vh(-32),
    alignSelf: 'center',
    zIndex: 1,
  },
  subView: { marginTop: vw(47) },
  subView1: { marginTop: vw(30), marginBottom: vh(80) },
  textView1: {
    height: vh(180),
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: normalize(20),
  },
  textView2: {
    height: vh(180),
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: normalize(20),
  },
});
