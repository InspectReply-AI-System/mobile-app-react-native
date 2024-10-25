import { FlatList, Text } from 'react-native';
import React from 'react';
import Column from '@inspectreplyai/components/general/Column';
import { BusinessCard } from '../contractorCard';
import { SectionData } from '../../ContractorDetails/@types';
import { styles } from './styles';

const ContracotrsCardsList = ({ title, data }: SectionData) => {
  return (
    <Column style={styles.headerView}>
      <Text style={styles.sectionHeader}>
        {title} ({data.length})
      </Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item?._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => <BusinessCard details={item} />}
      />
    </Column>
  );
};

export default ContracotrsCardsList;
