import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
  },
  inputStyle: {
    backgroundColor: colors.black,
  },
  inputsContainer: {
    flex: 1,
    marginTop: normalize(62),
    paddingTop: normalize(60),
    paddingHorizontal: normalize(16),
    borderTopLeftRadius: normalize(62),
    borderTopRightRadius: normalize(62),
    backgroundColor: colors.black27282B,
  },
});
