import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addressText: {
    color: colors.white,
    marginBottom: vh(8),
  },
  bgStyle: {
    marginTop: vh(-15),
  },

  costText: {
    color: colors.white,
    marginBottom: vh(8),
  },
  dateText: {
    color: colors.grey,
  },
  emptyBox: {
    backgroundColor: colors.black27282B,
    paddingTop: vh(36),
    paddingHorizontal: vw(18),
    paddingBottom: vh(65),
    borderRadius: normalize(8),
    borderWidth: normalize(1),
    borderColor: colors.primaryBlue,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vh(28),
  },
  emptyTextSubtitle: {
    color: colors.white,
    textAlign: 'center',
  },
  emptyTextTitle: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: vh(14),
  },
  firstOption: {
    paddingHorizontal: vw(16),
    borderTopRightRadius: normalize(12),
    borderTopLeftRadius: normalize(12),
  },
  itemContainer: {
    backgroundColor: colors.black27282B,
    borderRadius: normalize(8),
    padding: normalize(14),
    marginVertical: vh(4),
    borderWidth: normalize(1),
    borderColor: colors.primaryBlue,
  },
  itemFooter: {
    justifyContent: 'space-between',
    marginTop: vh(48),
  },
  itemHeader: {
    justifyContent: 'space-between',
    marginBottom: vh(8),
  },
  lastOption: {
    paddingHorizontal: vw(16),
    borderBottomLeftRadius: normalize(12),
    borderBottomRightRadius: normalize(12),
  },

  sharedText: {
    color: colors.grey,
  },
  tooltipContent: {
    borderRadius: normalize(12),
    backgroundColor: colors.black27282B,
  },
  tooltipOption: {
    color: colors.white,
    paddingVertical: vh(10),
  },
  tooltipWrapper: {
    backgroundColor: colors.transparent,
  },
  viewReportText: {
    color: colors.white,
    marginRight: vw(8),
  },
});
