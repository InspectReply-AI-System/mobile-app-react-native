import React, { useCallback, useEffect } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@inspectreplyai/themes';
import { CommonStrings, vh, vw } from '@inspectreplyai/utils';
import Touchable from '@inspectreplyai/components/general/Touchable';
import Column from '@inspectreplyai/components/general/Column';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { getCategory } from '@inspectreplyai/redux/contractor/action';
import Indicator from '@inspectreplyai/components/general/Indicator';

interface CategoryListProps {
  onSelectCategory: (category_name: string, _id: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const dispatch = useAppDispatch();
  const { category, loading } = useAppSelector(
    (state) => state.contractorSlice,
  );

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const renderCategory = useCallback(
    ({ item }: { item: { category_name: string; _id: string } }) => {
      return (
        <Touchable
          onPress={() => onSelectCategory(item.category_name, item._id)}>
          <Text style={styles.item}>{item?.category_name || ''}</Text>
        </Touchable>
      );
    },
    [],
  );
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
        data={category}
        ListEmptyComponent={listEmpty}
        renderItem={renderCategory}
        keyExtractor={(item: { category_name: string; _id: string }) =>
          item?._id
        }
        contentContainerStyle={
          category.length === 0 ? styles.flex : styles.contentStyle
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
