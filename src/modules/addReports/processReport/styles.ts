import { colors } from '@inspectreplyai/themes';
import { vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
    paddingHorizontal: vw(16),
  },
  text1: {
    marginHorizontal: vw(42),
    color: colors.grey,
    textAlign: 'center',
    bottom: vh(100),
  },
  text2: {
    marginHorizontal: vw(40),
    color: colors.grey,
    textAlign: 'center',
    bottom: vh(86),
  },
});
