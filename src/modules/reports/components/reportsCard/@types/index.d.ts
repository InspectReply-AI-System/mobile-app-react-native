import { ReportActions, ReportsTopTabs } from '@inspectreplyai/utils/Enums';

export interface TooltipContentProps {
  onClose: (type: ReportActions) => void;
  isSelected: boolean;
}

export interface RepairItemProps {
  item: {
    _id: string;
    estimated_price: any;
    last_shared: any;
    createdAt: string | undefined;
    dateCreated: string;
    address: string;
    cost: string;
    lastShared: string;
    final_report?: string;
  };
  onTooltipAction: (
    type: ReportActions,
    reportId: string,
    final_report?: string,
  ) => void;
  tab: ReportsTopTabs;
  onPressFullReport: (id: string) => void;
}
