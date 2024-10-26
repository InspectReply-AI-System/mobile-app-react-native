import { colors, fonts } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  doneButton: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(15),
    borderRadius: normalize(30),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
  },
  shareButton: {
    position: 'absolute',
    right: 27,
  },
  shareIcon: {
    height: normalize(48),
    width: normalize(48),
  },
  title: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: normalize(24),
    color: colors.white,
    fontFamily: fonts.REGULAR,
  },
  webView: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
});
