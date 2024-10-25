import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBlue,
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: vh(24),
    right: vw(24),
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: normalize(24),
    fontWeight: 'bold',
  },
});
