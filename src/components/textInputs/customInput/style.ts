import { colors, fonts } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.grey47464F,
    borderRadius: 4,
    marginTop: vh(24),
    justifyContent: 'center',
    height: normalize(56),
    paddingLeft: vw(16),
  },
  error: {
    color: colors.red,
    fontSize: normalize(12),
    fontFamily: fonts.BOLD,
    marginLeft: vw(8),
    marginTop: vh(4),
  },
  input: {
    color: colors.white,
    fontSize: normalize(16),
    fontFamily: fonts.REGULAR,
  },
  label: {
    color: colors.white,
    paddingHorizontal: vh(4),
    paddingVertical: vw(2),
    fontSize: normalize(12),
    fontFamily: fonts.REGULAR,
    alignSelf: 'flex-start',
  },
  labelContiainer: {
    backgroundColor: colors.primaryBlue,
    borderRadius: normalize(2),
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -10,
    zIndex: 1,
    marginLeft: vw(12),
  },
  rightIconContainer: {
    position: 'absolute',
    right: vw(18),
  },
});
