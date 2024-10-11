import { StyleSheet } from 'react-native';

import { colors, fonts } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { isIOS } from '@inspectreplyai/utils/platform';

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
  iconContainer: {},
  input: {
    color: colors.grey,
    width: '90%',
    fontSize: normalize(14),
    fontFamily: fonts.REGULAR,
    paddingVertical: isIOS ? vh(14) : vh(10),
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.black27282B,
    borderRadius: normalize(4),
    paddingHorizontal: vw(16),

    marginTop: vh(8),
    justifyContent: 'space-between',
  },
  label: {
    color: colors.white,
    marginBottom: 5,
  },
});
