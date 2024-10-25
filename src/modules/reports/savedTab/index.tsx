import React from 'react';
import ReportList from '../components/reportList/reportList';

import { ReportsTopTabs } from '@inspectreplyai/utils/Enums';
import { useAppSelector } from '@inspectreplyai/hooks/reduxHooks';

const SavedTab = () => {
  const { savedReports } = useAppSelector((store) => store.reportsSlice);
  return <ReportList repairs={savedReports} tab={ReportsTopTabs.SAVED} />;
};

export default SavedTab;
