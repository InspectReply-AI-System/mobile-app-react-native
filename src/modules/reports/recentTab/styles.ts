import { colors } from '@inspectreplyai/themes';
import { vh } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  contentContainer: {
    paddingBottom: vh(90),
  },
  list: {
    flex: 1,
  },
});
