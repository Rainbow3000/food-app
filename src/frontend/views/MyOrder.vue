<script lang="ts" setup>
import { useOrder } from "@/composables/useOrder";
import { useOrderStore } from "@/stores/order";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { formatCurrency, formatDate } from "@/utils/format";
import type { TProduct } from "@/common/type";
import { ORDER_STATUS } from "@/common/enum";

const { getOrderByUser, updateOrder } = useOrder();

export type TOrderData = {
  product?: TProduct;
  quantity?: number;
  totalMoney?: string;
  userNote?: string;
  createdAt?: string;
  orderStatus?: string;
  orderId?: number
};

const { orderList } = storeToRefs(useOrderStore());

const data = computed(() => {
  const order = [] as TOrderData[];

  orderList.value.forEach((item) => {
    item.orderDetails?.forEach((details) => {
      order.push({
        orderId: item.id,
        product: details.product,
        quantity: details.quantity,
        totalMoney: item.totalMoney,
        userNote: item.userNote,
        createdAt: formatDate(item.createdAt as string),
        orderStatus: item.orderStatus,
      });
    });
  });

  return order;
});

onMounted(async () => await getOrderByUser());

const activities = [
  {
    content: "Pending",
    timestamp: "2018-04-03 20:46",
    color: "gray",
  },
  {
    content: "Delivery",
    timestamp: "2018-04-03 20:46",
    color: "orange",
  },
  {
    content: "Done",
    timestamp: "2018-04-03 20:46",
    color: "green",
  },
  {
    content: "Cancel",
    timestamp: "2018-04-03 20:46",
    color: "red",
  },
];

const handleCancelOrder = async (id: number) => {
  await updateOrder({ orderStatus: ORDER_STATUS.CANCEL }, id);
  await getOrderByUser();
};
</script>

<template>
  <h2 style="margin-top: 50px; font-weight: bold">My order</h2>
  <div class="order-list">
    <el-timeline style="max-width: 600px">
      <el-timeline-item v-for="(activity, index) in activities" :key="index" :color="activity.color">
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
    <el-card>
      <el-table :data="data" style="width: 100%">
        <el-table-column label="Image" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <img width="90px" height="90px" :src="scope.row?.product?.image" alt="" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Description" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <div>
                <div>
                  Name:
                  <b>{{ scope.row?.product?.name }}</b>
                </div>
                <span>Size:
                  <div style="
                      width: 20px;
                      height: 20px;
                      background-color: #eeeeee;
                      text-align: center;
                      line-height: 20px;
                    ">
                    {{ scope.row?.product?.size }}
                  </div>
                </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="price" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="color: orangered">${{
                scope.row?.product?.newPrice
              }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="#ID" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span> x {{ scope.row?.orderId }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Qty" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span> x {{ scope.row?.quantity }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Total" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="color: red; font-weight: bold">${{
                scope.row?.product?.newPrice * scope.row?.quantity
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Date order" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row?.createdAt }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Note" width="180">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span>{{ scope.row?.userNote }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="120">
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <div v-if="scope.row?.orderStatus === 'pending'" style="
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background-color: gray;
                "></div>
              <div v-if="scope.row?.orderStatus === 'delivery'" style="
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background-color: orange;
                "></div>
              <div v-if="scope.row?.orderStatus === 'success'" style="
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background-color: green;
                "></div>
              <div v-if="scope.row?.orderStatus === 'cancel'" style="
                  width: 15px;
                  height: 15px;
                  border-radius: 50%;
                  background-color: red;
                "></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.order-list {
  width: 100%;
  padding: 0 190px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
  margin-top: 50px;

  .el-timeline {}
}
</style>
