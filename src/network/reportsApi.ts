import { ReportActions } from '@inspectreplyai/utils/Enums';
import { endpoints } from './endpoints';
import { postApiCall } from './networkMethods';
import { setContentType } from './networkServices';

type GenerateReportParams = {
  report_file: {
    uri: string;
    name: string;
    type: string;
  };
  customerId: string;
  contractors?: string[];
};

type ReportRouteParams = {
  cust_id: string;
  report_id?: string;
  final_report?: string;
};

const generateReport = async (params: GenerateReportParams): Promise<any> => {
  const data = new FormData();

  data.append('report_file', {
    uri: params?.report_file?.uri,
    type: params?.report_file.type,
    name: params?.report_file.name,
  } as any);

  data.append('customer', params?.customerId);

  if (params?.contractors?.length) {
    params.contractors.forEach((id) => data.append('contractors', id));
  }

  setContentType('multipart/form-data');

  return await postApiCall(endpoints.reports.reports, data);
};

const recentReports = async (params: ReportRouteParams) => {
  return await postApiCall(endpoints.reports.recentReports, params);
};

const favoriteReports = async (params: ReportRouteParams) => {
  return await postApiCall(endpoints.reports.favoriteReports, params);
};

const sharedReports = async (params: ReportRouteParams) => {
  return await postApiCall(endpoints.reports.sharedReports, params);
};

const handleReportAction = async (
  actionType: ReportActions,
  params: ReportRouteParams,
) => {
  const endpoint =
    actionType === ReportActions.SHARE
      ? endpoints.reports.addShareReports
      : endpoints.reports.addFavoriteReports;
  return await postApiCall(endpoint, params);
};

const reportSummary = async (report_id: string) => {
  return await postApiCall(endpoints.reports.reportSummary, { report_id });
};

export {
  generateReport,
  recentReports,
  favoriteReports,
  sharedReports,
  handleReportAction,
  reportSummary,
};
