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

export { generateReport };
