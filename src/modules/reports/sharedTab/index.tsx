// topTab/sharedTab/index.tsx

import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';
import Column from '@inspectreplyai/components/general/Column';

const SharedTab = () => {
  return (
    <Column style={styles.container}>
      <Text>Shared Tab</Text>
    </Column>
  );
};

export default SharedTab;
