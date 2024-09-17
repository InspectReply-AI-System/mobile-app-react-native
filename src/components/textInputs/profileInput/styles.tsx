import { StyleSheet } from 'react-native';

import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';

export const styles = StyleSheet.create({
  container: {
    marginBottom: vh(8),
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: colors.red,
  },
  errorText: {
    color: colors.red,
    marginTop: vh(4),
    fontSize: normalize(12),
  },
  iconContainer: {
    marginLeft: 10,
  },
  input: {
    color: colors.grey,
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.black27282B,
    borderRadius: normalize(4),
    paddingHorizontal: vw(16),
    paddingVertical: vh(14),
    marginTop: vh(8),
    justifyContent: 'space-between',
  },
  label: {
    color: colors.white,
    marginBottom: 5,
  },
});
