import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils/Dimensions';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'center',
    borderRadius: normalize(25),
    backgroundColor: colors.primaryBlue,
    marginTop: normalize(26),
  },
  disableButtonStyle: {
    backgroundColor: colors.blue296FA91A,
    borderColor: colors.primaryBlue,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: normalize(50),
    justifyContent: 'center',
    borderRadius: normalize(25),
    marginTop: normalize(26),
  },
  disableText: {
    fontSize: normalize(16),
    color: colors.grey47464F,
  },
  title: {
    fontSize: normalize(16),
    color: colors.white,
  },
});
