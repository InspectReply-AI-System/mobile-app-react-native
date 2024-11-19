import { colors, fonts, typography } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  accessFullReportTxt: {
    fontSize: normalize(13),
    fontFamily: fonts.POPPINS_LIGHT,
    marginTop: vh(12),
    alignSelf: 'center',
    color: colors.white,
  },
  cancelBtnStyle: {
    backgroundColor: colors.primaryBlack,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
  },
  contractorTxt: {
    marginTop: vh(18),
    alignSelf: 'center',
    fontSize: normalize(18),
    color: colors.white,
    fontFamily: fonts.POPPINS_SEMIBOLD,
  },
  dollarView: {
    position: 'absolute',
    bottom: vh(-32),
    alignSelf: 'center',
    zIndex: 1,
  },
  estimatedTxt: {
    fontSize: normalize(18),
    fontFamily: fonts.POPPINS_SEMIBOLD,
    color: colors.white,
    marginTop: vh(18),
    alignSelf: 'center',
  },
  iconStyle: { height: vh(64), width: vw(64) },
  mainView: {
    paddingHorizontal: vw(16),
  },
  numberTxt: {
    ...typography.h8,
    alignSelf: 'center',
    marginTop: vh(40),
    fontFamily: fonts.POPPINS_SEMIBOLD,
  },
  purchasePrizeTxt: {
    fontSize: normalize(28),
    fontFamily: fonts.POPPINS_SEMIBOLD,
    color: colors.white,
    alignSelf: 'center',
    marginTop: vh(49),
  },
  reportSvgView: {
    position: 'absolute',
    top: vh(-32),
    alignSelf: 'center',
    zIndex: 1,
  },
  subView: { marginTop: vw(60) },
  subView1: { marginTop: vw(30) },
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
