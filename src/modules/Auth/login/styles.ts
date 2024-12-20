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
  container: { flex: 1, backgroundColor: colors.primaryBlack },
  dontHaveAccount: {
    color: colors.primaryBlue,
  },
  forgot: {
    alignSelf: 'center',
    fontFamily: fonts.MEDIUM,
    marginTop: normalize(16),
    textDecorationLine: 'underline',
  },
  imageStyle: {
    width: vw(120),
    height: vw(120),
    alignSelf: 'center',
  },
  innerContainer: { paddingHorizontal: vw(16) },
  registerView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(16),
  },
  signIntext: {
    marginTop: vh(24),
    textAlign: 'center',
    color: colors.primaryBlue,
  },
  underlineText: { textDecorationLine: 'underline' },
});
