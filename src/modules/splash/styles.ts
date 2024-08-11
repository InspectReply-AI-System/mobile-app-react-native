import { colors } from '@inspectreplyai/themes';
import { vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBalck,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: { width: vh(180), height: vw(180) },
});
