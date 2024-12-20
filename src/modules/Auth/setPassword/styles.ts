import { StyleSheet } from 'react-native';

import { colors, fonts } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';

export const styles = StyleSheet.create({
  buttonContainer: { marginTop: 'auto' },
  checkBoxView: { alignItems: 'center', marginTop: vh(24) },
  container: { flex: 1, backgroundColor: colors.primaryBlack },
  iAcceptText: { fontSize: normalize(13), marginLeft: vw(7) },
  imageStyle: {
    height: vw(120),
    width: vw(120),
    alignSelf: 'center',
    borderRadius: normalize(18),
  },
  innerContainer: { paddingHorizontal: vw(16) },
  scrollContainer: { paddingBottom: vh(20), flex: 1 },
  signIntext: {
    textAlign: 'center',
    marginTop: vh(24),
    color: colors.primaryBlue,
  },
  underlineText: { textDecorationLine: 'underline', fontFamily: fonts.MEDIUM },
  welcomeHeading: {
    textAlign: 'center',
    marginTop: vh(14),
    marginBottom: vh(5),
  },
});
