export interface GetReportsPayload {
  cust_id: string;
}

export interface ReportState {
  loading: boolean;
  error: string;
  recentReports: [];
  sharedReports: [];
  savedReports: [];
}
