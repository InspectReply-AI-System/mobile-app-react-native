import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  errorText: { marginHorizontal: vw(16), width: '80%', color: colors.red },

  errorToastContainer: {
    width: '90%',
    padding: normalize(16),
    borderRadius: normalize(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blueE8EDFB,
  },
  infoText: { marginHorizontal: vw(16), color: colors.purple173EAD },
  innerContainer: { alignItems: 'center', flex: 1 },
  leftIcon: { height: vh(24), width: vw(24) },
  rightIcon: { height: vh(20), width: vw(20) },
  successText: { marginHorizontal: vw(16), color: colors.black3A3C3F },
  successToastContainer: {
    width: '90%',
    padding: normalize(16),
    borderRadius: normalize(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.greenE7F4EA,
  },
});
