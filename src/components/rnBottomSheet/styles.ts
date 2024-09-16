import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';
import { normalize, vw } from '@inspectreplyai/utils';

export const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurModal: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.white,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  bottomSheetIcon: {
    backgroundColor: colors.black,
  },
  bottomSheetRadius: {
    borderTopLeftRadius: normalize(16),
    borderTopRightRadius: normalize(16),
  },
  container: {
    borderTopRightRadius: vw(16),
    borderTopLeftRadius: vw(16),
  },
  mainContainer: {
    backgroundColor: colors.red,
    flex: 1,
  },
});
