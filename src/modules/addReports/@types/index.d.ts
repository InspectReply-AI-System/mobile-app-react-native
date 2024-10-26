interface ReportRouteParams {
  report_id: string;
}

// Get params type based on route name (assuming your route name is 'ProcessReport')
// eslint-disable-next-line no-undef
export type ProcessReportRouteProp = RouteProp<
  { ProcessReport: ReportRouteParams },
  'ProcessReport'
>;
