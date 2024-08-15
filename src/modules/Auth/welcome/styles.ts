import { colors } from '@inspectreplyai/themes';
import { vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: { marginTop: vh(120) },
  container: {
    flex: 1,
    paddingTop: vh(125),
    backgroundColor: colors.primaryBalck,
  },
  description: { textAlign: 'center', marginTop: vh(16) },
  dontAccount: {
    color: colors.primaryBlue,
    textAlign: 'center',
    marginTop: vh(16),
  },
  imageStyle: {
    height: vh(180),
    width: vw(180),
    alignSelf: 'center',
  },
  innerContainer: { paddingHorizontal: vw(16), marginTop: vh(44) },
  signIntext: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: vh(24),
  },
  welcomeHeading: { textAlign: 'center' },
});
