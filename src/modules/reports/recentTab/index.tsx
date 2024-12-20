import React from 'react';

import ReportList from '../components/reportList/reportList';
import { ReportsTopTabs } from '@inspectreplyai/utils/Enums';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';

const RecentTab = () => {
  const { recentReports } = useAppSelector((store) => store.reportsSlice);
  return <ReportList repairs={recentReports} tab={ReportsTopTabs.RECENT} />;
};

export default RecentTab;
