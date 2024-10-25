import { StyleSheet } from 'react-native';
import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
  description: {
    textAlign: 'center',
    marginTop: vh(16),
    color: colors.white,
  },
  imageStyle: {
    height: vw(120),
    width: vw(120),
    alignSelf: 'center',
    borderRadius: normalize(18),
    marginTop: vh(17),
  },
  innerContainer: {
    paddingHorizontal: vw(16),
    marginTop: normalize(106),
    paddingBottom: vh(20),
  },
  scrollContainer: {},
});
