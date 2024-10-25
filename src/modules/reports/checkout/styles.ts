import { colors } from '@inspectreplyai/themes';
import { normalize, vh, vw } from '@inspectreplyai/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  blueCard: {
    backgroundColor: colors.blue465B85,
  },
  buttonText: {
    color: colors.black,
  },
  card: {
    borderRadius: normalize(24),
    marginVertical: vh(10),
    alignItems: 'center',
    paddingTop: vh(24),
    paddingBottom: vh(24),
    marginTop: vh(16),
  },
  card1: {
    borderRadius: normalize(24),
    marginVertical: vh(10),
    alignItems: 'center',
    paddingTop: vh(24),
    paddingBottom: vh(24),
    marginTop: vh(16),
    height: vh(175),
  },
  container: {
    flex: 1,
    paddingHorizontal: vw(16),
  },
  description: {
    marginTop: vh(10),
    color: colors.black,
  },
  description1: {
    marginTop: vh(10),
  },
  fullPrice: {
    color: colors.black,
  },
  greenCard: {
    backgroundColor: colors.green,
  },
  includedHeader: {
    marginBottom: vh(8),
  },
  includedItem: {
    marginLeft: vw(8),
  },
  includedSection: {
    backgroundColor: colors.grey303238,
    borderRadius: normalize(24),
    paddingVertical: vh(32),
    paddingHorizontal: vw(24),
    marginTop: vh(24),
  },
  selectButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: normalize(20),
    paddingHorizontal: vw(32),
    paddingVertical: vh(8),
    marginTop: vh(35),
  },
  selectButton1: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: normalize(20),
    paddingHorizontal: vw(13),
    paddingVertical: vh(8),
    marginTop: vh(10),
    marginHorizontal: vw(4),
  },
  selectedCard: {
    // Custom styles for the selected card
  },
  tenReportSelectButton: {
    borderWidth: 1,
    borderColor: colors.blue75BEF4,
    borderRadius: normalize(20),
    paddingHorizontal: vw(32),
    paddingVertical: vh(8),
    marginTop: vh(35),
  },
});
