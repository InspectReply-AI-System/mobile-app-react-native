import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: normalize(11),
  },
  imageStyle: {
    width: normalize(24),
    height: normalize(24),
  },
  renderSubContainer: {
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  textStyle: {
    marginLeft: normalize(8),
  },
  uncheckedView: {
    borderWidth: 1,
    width: normalize(24),
    height: normalize(24),
    borderColor: colors.red,
    borderRadius: normalize(14),
  },
});
