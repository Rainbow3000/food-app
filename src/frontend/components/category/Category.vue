<script setup lang="ts">
import type { TCategory } from "@/common/type";

const props = defineProps<{
  category: TCategory;
}>();
</script>

<template>
  <router-link style="text-decoration: none;" class="category-container" :to="`/category/${props.category.id}`">
    <div class="category-img">
      <img :src="props.category.image" alt="" />
    </div>
    <span style="margin-top: 60px; font-weight: 500;">{{
      props.category.name
    }}</span>
    <span style="margin-top: 10px;">({{ props.category.products?.length }}) Food</span>
  </router-link>
</template>

<style lang="scss" scoped>
.category-container {
  width: 20%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  background-color: #f7f7f888;
  border-radius: 10px;
  margin: 50px 25px;
  cursor: pointer;

  .category-img {
    display: flex;
    width: 120px;
    height: 120px;
    justify-content: center;
    align-items: center;
    background-color: #ecf0ff;
    position: absolute;
    top: -50%;
    transform: translateY(50%);

    img {
      width: 80%;
      height: 80%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  span {
    color: gray;
  }
}
</style>
