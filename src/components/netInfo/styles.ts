import { colors, fonts, typography } from '@inspectreplyai/themes';
import { normalize, vh } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 'auto',
    paddingHorizontal: normalize(16),
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.primaryBlack,
    flex: 1,
  },
  errorText: {
    ...typography.h4,
    fontFamily: fonts.BOLD,
    color: colors.primaryBlue,
  },
  iconContainer: {
    marginVertical: vh(59),
  },
  image: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(18),
  },
});
