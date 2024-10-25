import { colors } from '@inspectreplyai/themes';
import { normalize, vh } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  contentContainer: {
    paddingBottom: vh(90),
  },
  customTextStyle: {
    borderRadius: normalize(24),
    marginBottom: vh(16),
    backgroundColor: colors.black27282B,
    height: normalize(40),
    borderWidth: 0,
  },
  list: {
    flex: 1,
  },
});
