<script lang="ts" setup>
import { useProduct } from "@/composables/useProduct";
import ProductList from "../components/product/ProductList.vue";
import { computed, onMounted, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { useProductStore } from "@/stores/product";
import type { TColor, TProductParams } from "@/common/type";
import { storeToRefs } from "pinia";

const { getProducts } = useProduct();

const { setFilter } = useProductStore();

const route = useRoute();

const id = computed(() => parseInt(route.params.id as string));

const { filter } = storeToRefs(useProductStore());

const filterParams = ref<TProductParams>({
  size: filter.value.size || "",
  color: filter.value.color || "",
  price: filter.value.price || "",
  categoryId: filter.value.categoryId || "",
});

const submitFilter = () => {
  setFilter(filterParams.value);

  getProducts();
};

const sizes = ref<string[]>(["S", "M", "L"]);

onMounted(() => {
  setFilter({ categoryId: id.value.toString() });
  getProducts();
});

onBeforeRouteLeave(async () => {
  setFilter({})
  await getProducts()
})
</script>

<template>
  <h2 style="margin-top: 50px; font-weight: bold;">FOOD BY CATEGORY</h2>
  <div class="category-details">
    <el-card class="left">
      <div class="filter-item">
        <span>Price</span>
        <div class="hr"></div>
        <div style="display: flex; align-items: center; margin-top: 10px">
          <input type="checkbox" :checked="filterParams.price === 'DESC'" @change="() => {
            filterParams.price = 'DESC';
            submitFilter();
          }
            " />
          <span>Expensive</span>
        </div>

        <div style="display: flex; align-items: center; margin-top: 10px">
          <input type="checkbox" :checked="filterParams.price === 'ASC'" @change="() => {
            filterParams.price = 'ASC';
            submitFilter();
          }
            " />
          <span>Cheap</span>
        </div>
      </div>

      <div class="filter-item">
        <span>Size</span>
        <div class="hr"></div>
        <div v-for="size in sizes" :key="size" style="display: flex; align-items: center; margin-top: 10px">
          <input type="checkbox" :checked="size === filterParams.size" @change="() => {
            filterParams.size = size;
            submitFilter();
          }
            " />
          <span>{{ size }}</span>
        </div>
      </div>
    </el-card>

    <div class="right">
      <ProductList :hiddenTitle="true" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-details {
  width: 100%;
  padding: 0 80px;
  display: flex;
  align-items: flex-start;
  height: auto;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;

  .left {
    border-radius: 5px;
    width: 23%;
    padding: 20px;
    color: gray;
    margin-top: 70px;

    .filter-item {
      width: 100%;
      height: auto;
      min-height: 100px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      span {
        font-size: 14px;
        min-width: 80px;
        width: auto;

        &:first-child {
          font-weight: 400;
          font-size: inherit;
          color: #333;
        }
      }

      .hr {
        width: 80%;
        height: 1px;
        background-color: rgba(105, 99, 99, 0.363);
        margin-bottom: 20px;
      }

      input {
        margin-right: 20px;
        width: 20px;
        height: 20px;

        &:hover {
          cursor: pointer;
        }
      }

      .color {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        margin-left: 50px;
        border: 0.5px solid rgba(128, 128, 128, 0.199);
        opacity: 0.5;
      }
    }
  }

  .right {
    width: 100%;
  }
}
</style>
