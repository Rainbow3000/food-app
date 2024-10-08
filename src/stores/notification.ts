import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { TNotification } from "@/common/type";

export const useNotificationStore = defineStore("notificationStore", () => {
  const notificationList = ref<TNotification[]>([]);

  const length = computed(() => notificationList.value.length);

  const setNotificationList = (payload: TNotification[]) => {
    notificationList.value = payload;
  };

  return {
    notificationList,
    setNotificationList,
    length
  };
});
