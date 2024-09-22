import React, { useCallback } from 'react';
import { Text, SectionList, FlatList, RefreshControl } from 'react-native';

import { styles } from './styles';
import ROUTES from '@inspectreplyai/routes/routes';
import { CommonStrings } from '@inspectreplyai/utils';
import { Images } from '@inspectreplyai/themes/appImages';
import Search from '@inspectreplyai/assets/svg/search.svg';
import { colors, typography } from '@inspectreplyai/themes';
import CustomHeader from '@inspectreplyai/components/header';
import Column from '@inspectreplyai/components/general/Column';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import Touchable from '@inspectreplyai/components/general/Touchable';
import LocalImage from '@inspectreplyai/components/general/LocalImage';
import FloatingButton from '@inspectreplyai/components/floatingButton';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import { getContractors } from '@inspectreplyai/redux/contractor/action';
import { BusinessCardProps, SectionData } from './ContractorDetails/@types';
import { useDebounce, useSimpleReducer } from '@inspectreplyai/hooks';
import CustomLoader from '@inspectreplyai/components/loader/customLoader';
import { useFocusEffect } from '@react-navigation/native';
import Config from 'react-native-config';

const BusinessCard = ({ details }: { details: BusinessCardProps }) => {
  const address = `${details.city_name || ''} ${details.state_name || ''} ${details.zip_code || ''}`;

  return (
    <Touchable
      style={styles.card}
      onPress={() =>
        navigate(ROUTES.CONTRACTORSDETAILS, { isNew: false, id: details._id })
      }>
      <Column style={styles.imageBox}>
        <LocalImage
          source={
            details?.profilePhoto
              ? { uri: `${Config.BASE_URL}/${details?.profilePhoto}` }
              : Images.appIcon
          }
          style={styles.profileImageStyle}
        />
      </Column>
      <Text style={[typography.body, styles.businessName]}>
        {details.company_name || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>
        {details.contractor_name || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>
        {details.email || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>
        {details.phone || ''}
      </Text>
      <Text style={[typography.h7, styles.cardTextStyle]}>{address}</Text>
    </Touchable>
  );
};

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
  const renderSectionHeader = ({
    section: { title, data },
  }: {
    section: SectionData;
  }) => {
    return (
      <Column style={styles.headerView}>
        <Text style={[typography.h5, styles.sectionHeader]}>
          {title} ({data.length})
        </Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item?._id}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => <BusinessCard details={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </Column>
    );
  };

  const renderItemInColumns = () => {
    return null;
  };

  const EmptyListComponent = () => {
    return (
      <Column style={styles.emptyListContainer}>
        {loading ? (
          <CustomLoader customContainerStyle={styles.loaderStyle} />
        ) : (
          <Text style={typography.h5}>{CommonStrings.noContractorFound}</Text>
        )}
      </Column>
    );
  };

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
        onChangeText={(text) => updateState({ search: text })}
        RightIcon={Search}
        placeholder={CommonStrings.search}
        customStyle={styles.customTextStyle}
        placeholderTextColor={colors.white}
      />
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => updateState({ refresh: !refresh })}
          />
        }
        contentContainerStyle={contractors.length <= 0 ? { flex: 1 } : {}}
        showsVerticalScrollIndicator={false}
        sections={contractors}
        keyExtractor={(item) => item?._id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItemInColumns}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={EmptyListComponent}
      />
    </Column>
  );
};

export default Contractors;
