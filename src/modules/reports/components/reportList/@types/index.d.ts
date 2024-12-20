import { ReportsTopTabs } from '@inspectreplyai/utils/Enums';

export interface reportData {
  _id: string;
  estimated_price: number;
  last_shared: string;
  createdAt: string | undefined;
  dateCreated: string;
  address: string;
  cost: string;
  lastShared: string;
}
export interface ReportListItemProps {
  item: reportData;
}

export interface ReportListProps {
  repairs: ArrayLike<reportData>;
  tab: ReportsTopTabs;
}
