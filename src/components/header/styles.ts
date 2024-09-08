import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: vh(10),
    paddingHorizontal: vw(15),
  },
  leftContainer: {
    flex: 0.2,
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  title: {
    color: colors.white,
    fontSize: normalize(24),
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 0.6,
    alignItems: 'center',
  },
});
