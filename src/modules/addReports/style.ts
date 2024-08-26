import { colors } from '@inspectreplyai/themes';
import { vh, vw } from '@inspectreplyai/utils';
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
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
  },
  noteText: {
    color: colors.grey,
    marginTop: vh(4),
  },
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
  uploadText: {
    color: colors.grey,
  },
  usePreferredText: {
    marginLeft: vw(4),
  },
});
