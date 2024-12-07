import { StyleSheet, Text } from 'react-native';
import React from 'react';
import Column from '@inspectreplyai/components/general/Column';
import { typography } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';

const EmptyListCard = () => {
  return (
    <Column style={styles.container}>
      <Text style={typography.h5}>{CommonStrings.noNotificationFound}</Text>
    </Column>
  );
};

export default EmptyListCard;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
