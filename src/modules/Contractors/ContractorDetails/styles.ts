import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: vh(8),
  },
  categorySubContainer: {
    backgroundColor: colors.black27282B,
    borderRadius: normalize(4),
    paddingHorizontal: vw(16),
    paddingVertical: vh(14),
    marginTop: vh(8),
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
    paddingHorizontal: 16,
  },
  form: {
    paddingBottom: 20,
  },
  input: {
    color: colors.grey,
  },
  label: {
    color: colors.white,
    marginBottom: 5,
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: normalize(60),
    resizeMode: 'cover',
  },
  profileImageView: {
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(120),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: vh(32),
    marginBottom: vh(16),
  },
});
