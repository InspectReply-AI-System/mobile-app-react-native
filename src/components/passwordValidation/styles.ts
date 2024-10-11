import { colors, fonts } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainer: {
    paddingVertical: normalize(11),
    marginLeft: normalize(8),
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
    color: colors.white,
    fontSize: normalize(16),
    fontFamily: fonts.REGULAR,
  },
  uncheckedView: {
    borderWidth: 2.5,
    width: normalize(22),
    height: normalize(22),
    borderColor: colors.white,
    borderRadius: normalize(15),
  },
});
