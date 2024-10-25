import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: vh(10),
    borderRadius: normalize(6),
  },
  tabBarContainer: {
    backgroundColor: colors.primaryBlack,
    paddingVertical: vh(4),
    paddingHorizontal: vw(4),
    borderRadius: normalize(8),
    borderColor: colors.primaryBlue,
    borderWidth: normalize(1),
    marginBottom: vh(12),
  },
});
