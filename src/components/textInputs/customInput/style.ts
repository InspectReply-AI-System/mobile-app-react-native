import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: vh(20),
  },
  input: {
    backgroundColor: colors.black,
    borderWidth: 1,
    borderColor: colors.grey47464F,
    borderRadius: 4,
    color: colors.white,
    paddingVertical: vh(16),
    paddingLeft: vw(16),
    fontSize: normalize(18),
    marginTop: vh(6),
  },
  label: {
    color: colors.white,
    paddingHorizontal: vh(4),
    paddingVertical: vw(2),
    fontSize: normalize(14),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  labelContiainer: {
    backgroundColor: colors.primaryBlue,
    borderRadius: normalize(2),
    alignSelf: 'flex-start',
    marginBottom: vh(-16),
    zIndex: 1,
    marginLeft: vw(12),
  },
});
