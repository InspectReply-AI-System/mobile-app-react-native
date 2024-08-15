import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
  },
  emailVerificationText: {
    marginVertical: vh(16),
  },
  imageStyle: {
    height: vw(120),
    width: vw(120),
    alignSelf: 'center',
    borderRadius: normalize(18),
    marginTop: vh(17),
  },
  innerContainer: {
    paddingHorizontal: vw(16),
  },
  scrollContainer: {},
});
