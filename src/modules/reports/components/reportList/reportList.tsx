import { Alert, FlatList, RefreshControl } from 'react-native';
import React, { useEffect } from 'react';

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
import { CommonFunctions, CommonStrings } from '@inspectreplyai/utils';
import { SvgIcon } from '@inspectreplyai/themes/appImages';
import { ReportActions, ReportsTopTabs } from '@inspectreplyai/utils/Enums';
import Column from '@inspectreplyai/components/general/Column';
import CustomInput from '@inspectreplyai/components/textInputs/customInput';
import { EmptyListComponent, ReportsCard } from '../reportsCard/reportsCard';
import { useDebounce, useSimpleReducer } from '@inspectreplyai/hooks';
import {
  handleReportAction,
  reportSummary,
} from '@inspectreplyai/network/reportsApi';
import {
  showErrorToast,
  showSuccessToast,
} from '@inspectreplyai/components/toast';
import { ReportListItemProps, ReportListProps } from './@types';
import { navigate } from '@inspectreplyai/utils/navigationUtils';
import ROUTES from '@inspectreplyai/routes/routes';
import CustomLoader from '@inspectreplyai/components/loader/customLoader';

const ReportList = ({ repairs, tab }: ReportListProps) => {
  const [state, updateState] = useSimpleReducer({
    search: '',
    refresh: false,
    loading: false,
  });
  const { search, refresh, loading } = state;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.AuthSlice);
  const debounceSearch = useDebounce(search, 500);

  const getReports = () => {
    const params = {
      cust_id: user?.userId,
      ...(search && { search: search }),
    };

    switch (tab) {
      case ReportsTopTabs.RECENT:
        dispatch(getRecentReport(params)).finally(() => {
          updateState({ refresh: false, loading: false });
        });
        break;
      case ReportsTopTabs.SHARED:
        dispatch(getSharedReport(params)).finally(() => {
          updateState({ refresh: false, loading: false });
        });
        break;
      case ReportsTopTabs.SAVED:
        dispatch(getFavoriteReport(params)).finally(() => {
          updateState({ refresh: false, loading: false });
        });
        break;
    }
  };

  useEffect(() => {
    updateState({ loading: true });
    getReports();
  }, [debounceSearch]);

  const onEnterSearch = (text: string) => {
    updateState({ search: text });
  };

  const onShare = async (reportId: string, actionType: ReportActions) => {
    try {
      setTimeout(async () => {
        CommonFunctions.share({
          message: `Report ID: ${reportId} `,
          onShare: async () => {
            try {
              updateState({ loading: true });
              const result = await handleReportAction(actionType, {
                cust_id: user?.userId,
                report_id: reportId,
              });
              updateState({ loading: false });
              showSuccessToast(result?.data?.message);
            } catch (error: any) {
              updateState({ loading: false });
              showErrorToast(error);
            }
          },
        });
      }, 100);
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleTooltipAction = async (
    actionType: ReportActions,
    reportId: string,
  ) => {
    if (ReportActions.SHARE === actionType) {
      onShare(reportId, actionType);
      return;
    } else {
      try {
        updateState({ loading: true });
        const result = await handleReportAction(actionType, {
          cust_id: user?.userId,
          report_id: reportId,
        });
        updateState({ loading: false });
        showSuccessToast(result?.data?.message);
      } catch (error: any) {
        updateState({ loading: false });
        showErrorToast(error);
      }
    }
  };

  const onPressFullReport = async (report_id: string) => {
    updateState({ loading: true });
    try {
      const result = await reportSummary(report_id);
      navigate(ROUTES.REPORTSUMMARY, { reportDetail: result.data.report });
      updateState({ loading: false });
    } catch (error: any) {
      showErrorToast(error);
      updateState({ loading: false });
    }
  };

  const renderReportsCards = ({ item }: ReportListItemProps) => {
    return (
      <ReportsCard
        item={item}
        onTooltipAction={handleTooltipAction}
        tab={tab}
        onPressFullReport={onPressFullReport}
      />
    );
  };

  const handleRefresh = () => {
    updateState({ refresh: true });
    getReports();
  };

  const handlePlaceHolder = () => {
    switch (tab) {
      case ReportsTopTabs.RECENT:
        return CommonStrings.searchRecent;
      case ReportsTopTabs.SHARED:
        return CommonStrings.searchSaved;
      case ReportsTopTabs.SAVED:
        return CommonStrings.searchShared;
    }
  };

  return (
    <Column style={styles.container}>
      <CustomInput
        RightIcon={SvgIcon.Search}
        placeholder={handlePlaceHolder()}
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
        ListEmptyComponent={() => <EmptyListComponent loading={loading} />}
        contentContainerStyle={styles.contentContainer}
      />
      {loading && <CustomLoader customContainerStyle={styles.loaderStyle} />}
    </Column>
  );
};

export default React.memo(ReportList);
