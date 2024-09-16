import { StyleSheet } from 'react-native';

import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { SCREEN_WIDTH } from '@inspectreplyai/utils/Dimensions';

export const styles = StyleSheet.create({
  businessName: {
    marginTop: vh(10),
  },
  card: {
    backgroundColor: colors.black27282B,
    borderRadius: normalize(8),
    padding: vw(8),
    borderColor: colors.primaryBlue,
    borderWidth: 1,
    width: SCREEN_WIDTH / 2.32,
    marginHorizontal: vw(6),
  },
  contact: {
    marginBottom: vh(5),
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
    paddingHorizontal: vw(14),
  },
  customTextStyle: {
    borderRadius: normalize(24),
    marginBottom: vh(16),
    height: normalize(40),
    backgroundColor: colors.black27282B,
  },
  email: {
    marginBottom: vh(5),
  },
  floatingBtnStyle: { zIndex: 1 },
  headerView: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
  },
  imageBox: {
    backgroundColor: colors.grey313C42,
    marginTop: vh(8),
    height: vh(110),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(6),
  },
  phone: {
    marginBottom: vh(5),
  },
  profileImageStyle: {
    height: vh(69),
    width: vw(84),
    resizeMode: 'contain',
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: vh(8),
  },
  sectionHeader: {
    marginVertical: vh(10),
  },
});
