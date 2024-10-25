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
  };
  onTooltipAction: (type: ReportActions, reportId: string) => void;
  tab: ReportsTopTabs;
}
