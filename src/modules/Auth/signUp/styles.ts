import { StyleSheet } from 'react-native';

import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';

export const styles = StyleSheet.create({
  checkBoxView: { alignItems: 'center' },
  container: { flex: 1, backgroundColor: colors.primaryBalck },
  iAcceptText: { fontSize: normalize(13), marginLeft: vw(7) },
  imageStyle: {
    height: vw(80),
    width: vw(80),
    alignSelf: 'center',
  },
  innerContainer: { paddingHorizontal: vw(16) },
  signIntext: {
    textAlign: 'center',
    marginTop: vh(24),
    color: colors.primaryBlue,
  },
  underlineText: { textDecorationLine: 'underline' },
  welcomeHeading: {
    textAlign: 'center',
    marginTop: vh(12),
  },
});
