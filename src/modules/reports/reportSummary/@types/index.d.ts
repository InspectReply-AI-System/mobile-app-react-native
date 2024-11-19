export interface ReportDetail {
  address: string;
  base_url: string;
  contractors: unknown[];
  estimated_price: number;
  id: string;
  report_id: string;
  _id: string;
}

export interface RouteParams {
  reportDetail: ReportDetail;
}
