import { colors, typography } from '@inspectreplyai/themes';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  resendtext: {
    ...typography.h6,
    textDecorationLine: 'underline',
    color: colors.primaryBlue,
  },
  timerStyle: {
    ...typography.h6,
    color: colors.primaryBlue,
  },
});
