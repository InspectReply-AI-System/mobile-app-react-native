import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import { CityListProps, States } from './@types';
import { useSimpleReducer } from '@inspectreplyai/hooks';
import { colors, typography } from '@inspectreplyai/themes';
import { CommonStrings, vh, vw } from '@inspectreplyai/utils';
import Column from '@inspectreplyai/components/general/Column';
import { showErrorToast } from '@inspectreplyai/components/toast';
import Indicator from '@inspectreplyai/components/general/Indicator';
import Touchable from '@inspectreplyai/components/general/Touchable';
import { getCitiesData } from '@inspectreplyai/network/contractorAPis';

const CityList: React.FC<CityListProps> = ({ sateData, onSelectCity }) => {
  const [state, updateState] = useSimpleReducer({
    city: [],
    loader: false,
  });

  const { city, loader } = state;

  const getCities = async () => {
    updateState({ loader: true });
    try {
      const params = {
        state_id: sateData._id,
        state_code: sateData.abbreviation,
      };
      const result = await getCitiesData(params);

      // Sort the cities alphabetically by name
      const sortedCities = result?.data
        ?.slice()
        ?.sort((a: { name: string }, b: { name: any }) => {
          return a?.name?.localeCompare(b?.name);
        });

      updateState({ city: sortedCities, loader: false });
    } catch (error: any) {
      updateState({ loader: false });
      showErrorToast(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const listEmpty = () => {
    return (
      <Column style={styles.centeredContainer}>
        {loader ? (
          <Indicator />
        ) : (
          <Text style={styles.item}>{CommonStrings.noCity}</Text>
        )}
      </Column>
    );
  };

  const renderCity = ({ item }: States) => {
    return (
      <Touchable onPress={() => onSelectCity(item)}>
        <Text style={styles.item}>{item.name}</Text>
      </Touchable>
    );
  };

  return (
    <Column style={styles.mainContainer}>
      <Text style={styles.header}>{CommonStrings.selectCity}</Text>
      <FlatList
        data={city}
        keyExtractor={(item) => item._id}
        renderItem={renderCity}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={
          city?.length === 0 ? styles.flex : styles.contentStyle
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
    backgroundColor: colors.primaryBlack,
    paddingHorizontal: vw(16),
    paddingTop: vh(32),
  },
});

export default React.memo(CityList);
