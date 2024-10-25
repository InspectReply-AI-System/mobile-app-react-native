import { colors, typography } from '@inspectreplyai/themes';
import { vh } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  sectionHeader: {
    ...typography.h5,
    marginVertical: vh(16),
  },
});
