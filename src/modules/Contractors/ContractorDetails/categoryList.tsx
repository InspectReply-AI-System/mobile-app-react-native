import React, { useCallback, useEffect } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { Categories, CategoryListProps } from './@types';
import { colors, typography } from '@inspectreplyai/themes';
import { CommonStrings, vh, vw } from '@inspectreplyai/utils';
import Column from '@inspectreplyai/components/general/Column';
import Indicator from '@inspectreplyai/components/general/Indicator';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { getCategory } from '@inspectreplyai/redux/contractor/action';

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const dispatch = useAppDispatch();
  const { category, loading } = useAppSelector(
    (state) => state.contractorSlice,
  );

  useEffect(() => {
    if (category?.length <= 0) {
      dispatch(getCategory());
    }
  }, []);

  // Sort categories alphabetically by category_name
  const sortedCategory = category?.slice()?.sort((a, b) => {
    return a?.category_name?.localeCompare(b?.category_name);
  });

  const renderCategory = useCallback(({ item }: Categories) => {
    return (
      <Touchable onPress={() => onSelectCategory(item)}>
        <Text style={styles.item}>{item?.category_name || ''}</Text>
      </Touchable>
    );
  }, []);

  const listEmpty = () => {
    return (
      <Column style={styles.centeredContainer}>
        {loading ? (
          <Indicator />
        ) : (
          <Text style={styles.item}>{CommonStrings.noCategoryAdded}</Text>
        )}
      </Column>
    );
  };

  return (
    <Column style={styles.mainContainer}>
      <Text style={styles.header}>{CommonStrings.selectCategory}</Text>
      <FlatList
        data={sortedCategory}
        ListEmptyComponent={listEmpty}
        renderItem={renderCategory}
        keyExtractor={(item: { category_name: string; _id: string }) =>
          item?._id
        }
        contentContainerStyle={
          sortedCategory.length === 0 ? styles.flex : styles.contentStyle
        }
      />
    </Column>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentStyle: { paddingVertical: vh(20) },
  flex: {
    flex: 1,
  },
  header: {
    ...typography.h2,
    padding: vw(4),
  },
  item: {
    ...typography.h6,
    padding: vw(6),
    marginTop: vh(10),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.primaryBalck,
    paddingHorizontal: vw(16),
    paddingTop: vh(32),
  },
});

export default React.memo(CategoryList);
