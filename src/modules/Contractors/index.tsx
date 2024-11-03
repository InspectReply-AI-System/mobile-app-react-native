import React, { useCallback } from 'react';
import { Text, SectionList, RefreshControl } from 'react-native';

import { styles } from './styles';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonStrings } from '@inspectreplyai/utils';
import { useFocusEffect } from '@react-navigation/native';
import { colors, typography } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import { useDebounce, useSimpleReducer } from '@inspectreplyai/hooks';
import FloatingButton from '@inspectreplyai/components/floatingButton';
import { getContractors } from '@inspectreplyai/redux/contractor/action';
import CustomLoader from '@inspectreplyai/components/loader/customLoader';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import { SectionData } from './ContractorDetails/@types';
import ContracotrsCardsList from './components/category';

const Contractors = () => {
  const dispatch = useAppDispatch();
  const { contractors, loading } = useAppSelector(
    (store) => store.contractorSlice,
  );
  const [state, updateState] = useSimpleReducer({
    search: '',
    refresh: false,
  });
  const { search, refresh } = state;

  const debouncedSearch = useDebounce(search, 400);

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getContractors({
          ...(search && { search: search }),
          success: () => updateState({ refresh: false }),
        }),
      );
    }, [debouncedSearch, refresh]),
  );

  const renderSectionHeader = useCallback(
    ({ section: { title, data } }: { section: SectionData }) => {
      return <ContracotrsCardsList title={title} data={data} />;
    },
    [],
  );

  const renderItemInColumns = useCallback(() => {
    return null;
  }, []);

  const EmptyListComponent = useCallback(() => {
    return (
      <Column style={styles.emptyListContainer}>
        {loading ? (
          <CustomLoader customContainerStyle={styles.loaderStyle} />
        ) : (
          <Text style={typography.h5}>{CommonStrings.noContractorFound}</Text>
        )}
      </Column>
    );
  }, [loading]);

  return (
    <Column style={styles.container}>
      <FloatingButton
        customStyle={styles.floatingBtnStyle}
        onPress={() => {
          navigate(ROUTES.CONTRACTORSDETAILS, { isNew: true });
        }}
      />
      <CustomHeader title={CommonStrings.contractors} />
      <CustomInput
        value={search}
        RightIcon={SvgIcon.Search}
        placeholder={CommonStrings.searchContractor}
        placeholderTextColor={colors.white}
        customStyle={styles.customTextStyle}
        onChangeText={(text) => updateState({ search: text.trimStart() })}
      />
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => updateState({ refresh: !refresh })}
          />
        }
        sections={contractors}
        renderItem={renderItemInColumns}
        keyExtractor={(item) => item?._id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={contractors?.length <= 0 ? { flex: 1 } : {}}
      />
    </Column>
  );
};

export default Contractors;
