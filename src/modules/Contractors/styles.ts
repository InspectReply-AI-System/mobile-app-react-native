import { StyleSheet } from 'react-native';

import { colors, fonts } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { SCREEN_WIDTH } from '@inspectreplyai/utils/Dimensions';

export const styles = StyleSheet.create({
  businessName: {
    marginTop: vh(10),
    fontFamily: fonts.MEDIUM,
  },
  card: {
    backgroundColor: colors.black27282B,
    borderRadius: normalize(8),
    padding: vw(8),
    borderColor: colors.primaryBlue,
    borderWidth: 1,
    width: SCREEN_WIDTH / 2.32,
    marginRight: vw(9),
  },
  cardTextStyle: {
    marginVertical: vh(4),
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
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  loaderStyle: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phone: {
    marginBottom: vh(5),
  },
  profileImageStyle: {
    height: vh(69),
    width: vw(84),
    resizeMode: 'contain',
    borderRadius: normalize(10),
  },
  row: {
    justifyContent: 'space-between',
    marginVertical: vh(8),
  },
  sectionHeader: {
    marginVertical: vh(16),
  },
});
