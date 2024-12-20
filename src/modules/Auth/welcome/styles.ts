import { colors } from '@inspectreplyai/themes';
import { vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: { marginTop: 'auto' },
  container: {
    flex: 1,
    marginTop: vh(125),
    backgroundColor: colors.primaryBlack,
  },
  description: { textAlign: 'center', marginTop: vh(16) },
  dontAccount: {
    color: colors.primaryBlue,
    textAlign: 'center',
    marginTop: vh(16),
  },
  imageStyle: {
    alignSelf: 'center',
  },
  innerContainer: { paddingHorizontal: vw(16), marginTop: vh(44), flex: 1 },
  signIntext: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: vh(24),
  },
  welcomeHeading: { textAlign: 'center', marginTop: vh(44) },
});
