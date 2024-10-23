import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { styles } from './styles';
import { repairs } from '../components/recentTabCardData/data';
import {
  EmptyListComponent,
  ReportsCard,
} from '../components/reportsCard/reportsCard';
import Column from '@inspectreplyai/components/general/Column';
import { colors } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';

const RecentTab = () => {
  const [search, setSearch] = useState('');
  return (
    <Column style={styles.container}>
      <CustomInput
        RightIcon={SvgIcon.Search}
        placeholder={CommonStrings.searchReports}
        customStyle={styles.customTextStyle}
        placeholderTextColor={colors.white}
        value={search}
        onChangeText={(text: string) => setSearch(text)}
      />
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
