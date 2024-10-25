interface ReportRouteParams {
  pdfDetails: { uri: string; name: string; type: string }[];
  isChecked?: boolean;
  contractors?: any[];
}

// Get params type based on route name (assuming your route name is 'ProcessReport')
// eslint-disable-next-line no-undef
export type ProcessReportRouteProp = RouteProp<
  { ProcessReport: ReportRouteParams },
  'ProcessReport'
>;
