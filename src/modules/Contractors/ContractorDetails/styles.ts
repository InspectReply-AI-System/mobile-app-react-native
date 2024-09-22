import { colors, fonts } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  blurView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  cancelButtonView: {
    height: normalize(44),

    marginTop: normalize(12),
    borderColor: colors.white,
    backgroundColor: colors.primaryBalck,
    borderRadius: 0,
  },
  categoryContainer: {
    marginBottom: vh(8),
  },
  categorySubContainer: {
    backgroundColor: colors.black27282B,
    borderRadius: normalize(4),
    paddingHorizontal: vw(16),
    paddingVertical: vh(14),
    marginTop: vh(8),
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.transparent,
  },
  confirmButtonView: {
    height: normalize(44),
    backgroundColor: colors.red,
    borderRadius: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
    paddingHorizontal: 16,
  },
  deleteDesc: {
    textAlign: 'center',
    marginHorizontal: normalize(16),
    marginTop: normalize(5),
  },
  deleteProfile: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  deleteText: {
    fontSize: normalize(16),
    color: colors.red,
    fontFamily: fonts.MEDIUM,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    paddingBottom: normalize(70),
    textAlign: 'center',
  },

  errorText: {
    color: colors.red,
    marginTop: vh(4),
    fontSize: normalize(12),
  },
  form: {
    paddingBottom: 20,
  },
  headerIconStyle: {
    width: normalize(34),
    height: normalize(34),
  },

  imageStyle: {
    width: normalize(110),
    height: normalize(110),
    borderRadius: normalize(100),
    backgroundColor: colors.black,
  },
  input: {
    color: colors.grey,
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
  label: {
    color: colors.white,
    marginBottom: 5,
  },
  loaderStyle: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },

  modalContentContainer: {
    width: '70%',
    borderRadius: normalize(12),
    backgroundColor: colors.black1E1E1E,
    paddingVertical: normalize(16),
  },

  modalInfo: {
    height: normalize(48),
    width: normalize(48),
  },
  modalView: { margin: 0, justifyContent: 'center', alignItems: 'center' },

  plusIconStyle: {
    height: normalize(30),
    width: normalize(30),
    position: 'absolute',
    bottom: normalize(-18),
    right: normalize(-5),
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: normalize(60),
    resizeMode: 'cover',
  },
  profileImageView: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(120),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: vh(32),
    marginBottom: vh(16),
    borderWidth: vw(16),
    borderColor: colors.grey313C42,
  },
});
