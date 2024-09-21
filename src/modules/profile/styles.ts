import { colors, fonts } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { SCREEN_HEIGHT, SMALL_DEVICE } from '@inspectreplyai/utils/Dimensions';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  arrowStyle: {
    height: 20,
    width: 20,
    transform: [{ rotate: '-90deg' }],
  },
  blurView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  cancelButtonView: {
    borderWidth: 1,
    height: normalize(44),
    marginTop: normalize(12),
    borderColor: colors.white,
    backgroundColor: colors.primaryBalck,
  },
  changePassword: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(48),
    marginTop: normalize(24),
    borderColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: normalize(16),
  },
  confirmButtonView: {
    height: normalize(44),
    backgroundColor: colors.red,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
  },
  deleteDesc: {
    fontSize: 14,
    fontFamily: fonts.ITALIC,
    color: colors.white,
    marginTop: normalize(5),
  },
  deleteProfile: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  deleteText: {
    fontSize: normalize(16),
    color: colors.red,
    fontFamily: fonts.MEDIUM,
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  headerIconStyle: {
    width: normalize(34),
    height: normalize(34),
  },
  imageContainer: {
    zIndex: 1,
    left: '34%',
    position: 'absolute',
    alignItems: 'center',
    width: normalize(120),
    height: normalize(120),
    justifyContent: 'center',
    borderRadius: normalize(100),
    top: SMALL_DEVICE ? '14%' : '16%',
    backgroundColor: colors.primaryBalck,
  },
  imageStyle: {
    width: normalize(110),
    height: normalize(110),
    borderRadius: normalize(100),
    backgroundColor: colors.grey313C42,
  },
  inputStyle: {
    backgroundColor: colors.black,
  },
  inputsContainer: {
    flex: 1,
    marginTop: normalize(62),
    paddingTop: normalize(60),
    paddingHorizontal: normalize(16),
    borderTopLeftRadius: normalize(62),
    borderTopRightRadius: normalize(62),
    backgroundColor: colors.black27282B,
  },
  loaderStyle: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  logoutText: {
    fontSize: normalize(16),
    color: colors.primaryBlue,
    fontFamily: fonts.MEDIUM,
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
  modalContentContainer: {
    height: SCREEN_HEIGHT / 3,
    width: '85%',
    position: 'absolute',
    borderRadius: normalize(12),
    backgroundColor: colors.black27282B,
    paddingLeft: normalize(16),
    paddingRight: normalize(12),
    paddingTop: normalize(20),
  },
  modalCrossIcon: {
    height: normalize(16),
    width: normalize(16),
    marginTop: normalize(8),
    marginRight: normalize(10),
  },
  modalInfo: {
    height: normalize(48),
    width: normalize(48),
  },
  plusIconStyle: {
    height: normalize(30),
    width: normalize(30),
    position: 'absolute',
    bottom: normalize(2),
    right: normalize(10),
  },
  privacyText: {
    fontSize: 16,
    fontFamily: fonts.REGULAR,
    color: colors.white,
  },
  seperatorView: {
    height: normalize(23),
    width: normalize(4),
    backgroundColor: colors.white,
    marginHorizontal: normalize(10),
  },
  termsText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.REGULAR,
  },
  termsView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(20),
  },
});
