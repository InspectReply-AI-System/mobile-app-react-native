import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, typography } from '@inspectreplyai/themes';

const Contractors = () => {
  return (
    <View style={styles.continer}>
      <Text style={typography.body}>Contractors</Text>
    </View>
  );
};

export default Contractors;
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBalck,
  },
});
