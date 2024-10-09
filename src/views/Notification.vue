<script lang="ts" setup>
import BaseTable from "@/base/BaseTable.vue";
import { useNotification } from "@/composables/useNotification";
import { useNotificationStore } from "@/stores/notification";
import { exportToExcel } from "@/utils/export";
import { formatDate } from "@/utils/format";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

const notificationStore = useNotificationStore();

const { notificationList } = storeToRefs(notificationStore);

const tableData = computed(() =>
  notificationList.value.map((item) => {
    return {
      id: item.id,
      userId: item.userId,
      content: item.content,
      createdAt: formatDate(item.createdAt as string),
    };
  })
);

const { getNotification, deleteNotify } = useNotification()

const tableColumns = [
  { prop: "id", label: "#ID", width: "auto" },
  { prop: "userId", label: "ID người dùng", width: "auto" },
  { prop: "content", label: "Nội dung", width: "auto" },
  { prop: "createdAt", label: "Ngày tạo", width: "auto" },
];

const handleDelete = async (id: number) => {
  await deleteNotify(id);
  await getNotification();
};

const handleExportFile = () => {
  exportToExcel(notificationList.value);
};

onMounted(() => getNotification());
</script>

<template>
  <div class="comment-container">
    <div class="comment-list">
      <BaseTable styleValue="height: 700px" :data="tableData" :columns="tableColumns" :isHiddenComponent="true"
        :isHiddenUpdate="true" screen="thông báo" @delete="handleDelete" @export="handleExportFile" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .comment-featured {
    width: 100%;
    display: flex;
    align-items: center;

    .el-card {
      height: 200px;
      flex: 1;
      margin: 20px;
    }
  }

  .comment-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;

    .el-input {
      margin-bottom: 20px;
    }
  }
}
</style>
