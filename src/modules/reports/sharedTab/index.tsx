import React from 'react';
import { ReportsTopTabs } from '@inspectreplyai/utils/Enums';
import ReportList from '../components/reportList/reportList';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';

const SharedTab = () => {
  const { sharedReports } = useAppSelector((store) => store.reportsSlice);
  return <ReportList repairs={sharedReports} tab={ReportsTopTabs.SHARED} />;
};

export default SharedTab;
