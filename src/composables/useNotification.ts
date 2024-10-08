import type { TError, TResult } from "@/common/type";
import { useNotificationStore } from "@/stores/notification";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";

export const useNotification = () => {
  const notificationStore = useNotificationStore();

  const getNotification = async () => {
    try {
      const response = await request.get("/notification");

      const { data } = response.data as TResult;

      notificationStore.setNotificationList(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const updateSeenNotify = async () => {
    try {
      await request.post("/notification/update-seen");

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    notificationStore,
    getNotification,
    updateSeenNotify
  };
};
