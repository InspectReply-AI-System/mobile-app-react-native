import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: normalize(10),
    paddingVertical: normalize(14),
    borderColor: colors.primaryBlue,
    paddingHorizontal: normalize(14),
    backgroundColor: colors.black27282B,
  },
  crossIcon: {
    width: normalize(12),
    height: normalize(12),
  },
  description: {
    color: colors.white,
    marginTop: normalize(16),
    lineHeight: normalize(22),
  },
  textIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: colors.grey,
    marginTop: normalize(4),
  },
});
