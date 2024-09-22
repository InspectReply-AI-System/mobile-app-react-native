import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@inspectreplyai/themes';
import { CommonStrings, vh, vw } from '@inspectreplyai/utils';
import Touchable from '@inspectreplyai/components/general/Touchable';
import Column from '@inspectreplyai/components/general/Column';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { getStates } from '@inspectreplyai/redux/contractor/action';
import Indicator from '@inspectreplyai/components/general/Indicator';

interface StateListProps {
  onSelectState: (state: {
    name: string;
    _id: string;
    abbreviation: string;
  }) => void;
}

const StateList: React.FC<StateListProps> = ({ onSelectState }) => {
  const dispatch = useAppDispatch();
  const { states, loading } = useAppSelector((store) => store.contractorSlice);

  useEffect(() => {
    if (states?.length <= 0) {
      dispatch(getStates());
    }
  }, []);

  const listEmpty = () => {
    return (
      <Column style={styles.centeredContainer}>
        {loading ? (
          <Indicator />
        ) : (
          <Text style={styles.item}>{CommonStrings.noStates}</Text>
        )}
      </Column>
    );
  };

  return (
    <Column style={styles.mainContainer}>
      <Text style={styles.header}>{CommonStrings.selectState}</Text>
      <FlatList
        data={states}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <Touchable onPress={() => onSelectState(item)}>
            <Text style={styles.item}>{item?.name || ''}</Text>
          </Touchable>
        )}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={
          states.length === 0 ? styles.flex : styles.contentStyle
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

export default React.memo(StateList);
