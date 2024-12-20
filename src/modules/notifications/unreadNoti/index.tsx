import React from 'react';
import NotiCard from '../notiCard';
import { colors } from '@inspectreplyai/themes';
import { normalize } from '@inspectreplyai/utils';
import { Alert, FlatList, StyleSheet } from 'react-native';
import Column from '@inspectreplyai/components/general/Column';

const UnreadNoti = () => {
  const _renderItem = () => {
    return (
      <>
        <NotiCard
          description={`Lorem ipsum dolor sit amet consectetur. Nulla tortor massa id miphasellus vivamus. Pretium pulvinar netus dictum et quamullamcorpereretium pulvinar netus dictum et quamullamcorperwjkdbewjkdekwjdeqwjbdkewd`}
          heading={'Your report is ready to view'}
          onActionPress={() => Alert.alert('Delete')}
          onRightIconPress={() => {}}
          subLabel={'3h ago'}
        />
      </>
    );
  };

  return (
    <Column style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: normalize(20) }}
        ItemSeparatorComponent={() => <Column style={{ marginTop: 8 }} />}
      />
    </Column>
  );
};

export default UnreadNoti;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlack,
  },
});
