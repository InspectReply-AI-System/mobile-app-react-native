import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: vw(16),
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: vh(36),
  },
  checkContainer: {
    alignItems: 'center',
  },
  clickUploadText: {
    color: colors.grey,
    marginTop: vh(24),
  },
  generateButtonStyle: {
    backgroundColor: colors.primaryBlack,
    borderWidth: 1,
    borderColor: colors.primaryBlue,
  },
  loaderStyle: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  noteText: {
    color: colors.grey,
    marginTop: vh(4),
  },
  pdfNameContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    padding: normalize(12),
    borderRadius: normalize(8),
    backgroundColor: colors.black27282B,
    marginTop: vh(32),
  },
  pdfNameSubContainer: { alignItems: 'center' },
  reportGenerateText: {
    color: colors.grey,
    textAlign: 'center',
    marginHorizontal: vw(40),
    marginTop: vh(8),
  },
  subContainer: {
    paddingHorizontal: vw(16),
  },
  uploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: vh(212),
    backgroundColor: colors.black27282B,
    borderStyle: 'dashed',
    borderWidth: 1.7,
    borderColor: colors.primaryBlue,
    marginTop: vh(32),
  },
  uploadPdfText: {
    marginLeft: vw(8),
    width: '82%',
  },
  uploadText: {
    color: colors.grey,
  },
  usePreferredText: {
    marginLeft: vw(4),
  },
});
