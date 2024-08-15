import { StyleSheet } from 'react-native';

import { colors, fonts } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';

export const styles = StyleSheet.create({
  connectorText: {
    marginHorizontal: normalize(8),
  },
  connectorView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(24),
    marginBottom: normalize(32),
  },
  container: { flex: 1, backgroundColor: colors.primaryBalck },
  dontHaveAccount: {
    color: colors.primaryBlue,
  },
  forgot: {
    textDecorationLine: 'underline',
    fontFamily: fonts.MEDIUM,
    marginTop: normalize(16),
    alignSelf: 'center',
  },
  imageStyle: {
    height: vw(80),
    width: vw(80),
    alignSelf: 'center',
  },
  innerContainer: { paddingHorizontal: vw(16) },
  registerView: {
    marginTop: normalize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signIntext: {
    textAlign: 'center',
    marginTop: vh(24),
    color: colors.primaryBlue,
  },
  underlineText: { textDecorationLine: 'underline' },
});
