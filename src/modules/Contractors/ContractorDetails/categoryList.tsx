import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@inspectreplyai/themes';
import { CommonStrings, vh, vw } from '@inspectreplyai/utils';
import Touchable from '@inspectreplyai/components/general/Touchable';
import Column from '@inspectreplyai/components/general/Column';

interface CategoryListProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <Column style={styles.mainContainer}>
      <Text style={styles.header}>{CommonStrings.selectCategory}</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Touchable onPress={() => onSelectCategory(item)}>
            <Text style={styles.item}>{item}</Text>
          </Touchable>
        )}
      />
    </Column>
  );
};

const styles = StyleSheet.create({
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

export default CategoryList;
