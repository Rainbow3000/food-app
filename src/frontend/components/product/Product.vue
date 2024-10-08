<script setup lang="ts">
import type { TProduct } from "@/common/type";

const props = defineProps<{
  product: TProduct;
}>();

</script>

<template>
  <router-link
    style="text-decoration: none"
    class="product-container"
    :to="`/product/${props.product?.id}`"
  >
    <img :src="props.product?.image" alt="" />
    <div class="main">
      <div class="product-cate">
        <div style="margin-bottom: 10px; width: 100%">
          <span
            style="
              color: #333;
              display: block;
              font-weight: 500;
              width: 60%;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
            >{{ props.product?.name }}</span
          >
          <span style="font-weight: 300; color: gray; width: 40%; text-align: right"
            >#Sold: {{ product.sold }}</span
          >
        </div>
      </div>

      <div class="product-price">
        <span>$ {{ props.product?.newPrice }}</span>

        <el-button
          style="
            background-color: orangered;
            height: 45px;
            font-weight: 300;
            color: white;
            border-radius: 10px;
          "
          >Add to cart</el-button
        >
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.product-container {
  width: 300px;
  height: auto;
  margin: 10px 0;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.5px solid rgba(128, 128, 128, 0.26);
  border-radius: 5px;
  color: gray;
  margin: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: all 0.5s ease;
  }

  img {
    width: 100%;
    height: 280px;
    margin-bottom: 10px;
    object-fit: cover;
    border-radius: 5px;
  }

  .main {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;

    .product-cate {
      width: 100%;
      height: auto;

      div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      i {
        color: orange;
      }
    }

    .product-price {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
  }

  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .color-list {
      display: flex;
      align-items: center;
      height: auto;
      flex: 1;

      .color {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: pink;
        margin-right: 10px;
      }
    }

    .size-list {
      display: flex;
      align-items: center;
      height: auto;
      flex: 1;
      justify-content: flex-end;

      .size {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background-color: #eeeeee;
        margin-right: 10px;
        text-align: center;
        line-height: 20px;
      }
    }
  }
}
</style>
