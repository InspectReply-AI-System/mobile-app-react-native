import React from 'react';
import { FlatList } from 'react-native';
import { styles } from './styles';
import { repairs } from '../components/recentTabCardData/data';
import {
  EmptyListComponent,
  ReportsCard,
} from '../components/reportsCard/reportsCard';
import Column from '@inspectreplyai/components/general/Column';

const RecentTab = () => {
  return (
    <Column style={styles.container}>
      <FlatList
        data={repairs}
        renderItem={({ item }) => <ReportsCard item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={styles.contentContainer}
      />
    </Column>
  );
};

export default RecentTab;
