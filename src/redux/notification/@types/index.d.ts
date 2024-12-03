export interface NotificationState {
  error: string;
  loading: boolean;
  unreadNotis: [];
  readNotis: [];
}

export interface NotificationItem {
  content: string;
  createdAt: string;
  customer: string;
  status: number;
  updatedAt: string;
  __v: number;
  _id: string;
}
