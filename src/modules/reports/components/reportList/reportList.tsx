import { FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useEffect } from 'react';

import {
  useAppDispatch,
  useAppSelector,
} from '@inspectreplyai/hooks/reduxHooks';
import {
  getRecentReport,
  getSharedReport,
  getFavoriteReport,
} from '@inspectreplyai/redux/reports/action';
import { styles } from './styles';
import { colors } from '@inspectreplyai/themes';
import { CommonStrings } from '@inspectreplyai/utils';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import { ReportActions, ReportsTopTabs } from '@inspectreplyai/utils/Enums';
import Column from '@inspectreplyai/components/general/Column';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import { EmptyListComponent, ReportsCard } from '../reportsCard/reportsCard';
import { useDebounce, useSimpleReducer } from '@inspectreplyai/hooks';
import { handleReportAction } from '@inspectreplyai/network/reportsApi';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { ReportListProps } from './@types';

const ReportList = ({ repairs, tab }) => {
  const [state, updateState] = useSimpleReducer({
    search: '',
    refresh: false,
  });
  const { search, refresh } = state;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.AuthSlice);

  const getReports = useCallback(() => {
    const params = {
      cust_id: user?.userId,
      ...(search && { search: search }),
    };

    switch (tab) {
      case ReportsTopTabs.RECENT:
        dispatch(getRecentReport(params)).finally(() => {
          updateState({ refresh: false });
        });
        break;
      case ReportsTopTabs.SHARED:
        dispatch(getSharedReport(params)).finally(() => {
          updateState({ refresh: false });
        });
        break;
      case ReportsTopTabs.SAVED:
        dispatch(getFavoriteReport(params)).finally(() => {
          updateState({ refresh: false });
        });
        break;
    }
  }, [tab]);

  const debounceSearch = useDebounce(search, 500);

  useEffect(() => {
    getReports();
  }, [debounceSearch]);

  const onEnterSearch = (text: string) => {
    updateState({ search: text });
  };
  const handleTooltipAction = async (
    actionType: ReportActions,
    reportId: string,
  ) => {
    try {
      const result = await handleReportAction(actionType, {
        cust_id: user?.userId,
        report_id: reportId,
      });
      showSuccessToast(result?.data?.message);
    } catch (error: any) {
      showErrorToast(error);
    }
  };

  const renderReportsCards = useCallback(({ item }: ReportListProps) => {
    return (
      <ReportsCard
        item={item}
        onTooltipAction={handleTooltipAction}
        tab={tab}
      />
    );
  }, []);

  const handleRefresh = () => {
    updateState({ refresh: true });
    getReports();
  };

  return (
    <Column style={styles.container}>
      <CustomInput
        RightIcon={SvgIcon.Search}
        placeholder={CommonStrings.searchReports}
        customStyle={styles.customTextStyle}
        placeholderTextColor={colors.white}
        value={search}
        onChangeText={onEnterSearch}
      />
      <FlatList
        data={repairs}
        renderItem={renderReportsCards}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
        keyExtractor={(item) => item._id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={styles.contentContainer}
      />
    </Column>
  );
};

export default React.memo(ReportList);
