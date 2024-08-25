import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, typography } from '@inspectreplyai/themes';

const Reports = () => {
  return (
    <View style={styles.continer}>
      <Text style={typography.body}>Reports</Text>
    </View>
  );
};

export default Reports;
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBalck,
  },
});
