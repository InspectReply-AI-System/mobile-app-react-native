import { StyleSheet, Text } from 'react-native';
import React from 'react';
import Column from '@inspectreplyai/components/general/Column';
import { colors, typography } from '@inspectreplyai/themes';
import PrimaryButton from '@inspectreplyai/components/buttons/primaryButton';
import { CommonStrings, vh, vw } from '@inspectreplyai/utils';
import Loader from '@inspectreplyai/components/loader';
import { reset } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';

const ProcessReport = () => {
  return (
    <Column style={styles.container}>
      <Loader />
      <Text style={[typography.body, styles.text1]}>
        {CommonStrings.reportPdfText1}
      </Text>
      <Text style={[typography.body, styles.text2]}>
        {CommonStrings.reportPdfText2}
      </Text>
      <Column style={styles.btnContainer}>
        <PrimaryButton
          title='Ok'
          onPress={() => {
            reset(ROUTES.BOTTOMTAB);
          }}
        />
      </Column>
    </Column>
  );
};

export default ProcessReport;

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
    paddingHorizontal: vw(16),
  },
  text1: {
    marginHorizontal: vw(42),
    color: colors.grey,
    textAlign: 'center',
    bottom: vh(100),
  },
  text2: {
    marginHorizontal: vw(40),
    color: colors.grey,
    textAlign: 'center',
    bottom: vh(86),
  },
});
