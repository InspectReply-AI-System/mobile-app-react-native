// topTab/savedTab/index.tsx

import Column from '@inspectreplyai/components/general/Column';
import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

const SavedTab = () => {
  return (
    <Column style={styles.container}>
      <Text>Saved Tab</Text>
    </Column>
  );
};

export default SavedTab;
