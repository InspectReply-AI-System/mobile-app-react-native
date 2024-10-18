export interface TooltipContentProps {
  onClose: () => void;
  isSelected: boolean;
}

export interface RepairItemProps {
  item: {
    id: string;
    dateCreated: string;
    address: string;
    cost: string;
    lastShared: string;
  };
}
