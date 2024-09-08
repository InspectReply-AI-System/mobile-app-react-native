import FloatingButton from '@inspectreplyai/components/floatingButton';
import React from 'react';
import { FlatList } from 'react-native';
import { styles } from './styles';
import { repairs } from '../components/recentTabCardData/data';
import { EmptyListComponent, RepairItem } from './recentRenderItem';
import Column from '@inspectreplyai/components/general/Column';
import ROUTES from '@inspectreplyai/routes/routes';
import { navigate } from '@inspectreplyai/utils/navigationUtils';

const RecentTab = () => {
  return (
    <Column style={styles.container}>
      <FlatList
        data={repairs}
        renderItem={({ item }) => <RepairItem item={item} />}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={styles.contentContainer}
      />
      <FloatingButton
        onPress={() => {
          navigate(ROUTES.ADDREPORTS);
        }}
      />
    </Column>
  );
};

export default RecentTab;
