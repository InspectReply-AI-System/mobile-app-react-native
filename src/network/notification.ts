import { postApiCall } from './networkMethods';
import { endpoints } from './endpoints';

const getNotifications = async (payload: { cust_id: string }) => {
  return await postApiCall(endpoints.notification.getNotifications, {
    cust_id: payload?.cust_id,
  });
};

export { getNotifications };
