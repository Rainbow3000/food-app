<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
//:autoplay="3000" :wrap-around="true"
</script>

<template>
  <div style="width: 100vw">
    <Carousel :autoplay="3000" :wrap-around="true">
      <Slide key="2">
        <div class="carousel__item">
          <img
            width="100%"
            height="100%"
            src="https://graphicsfamily.com/wp-content/uploads/edd/2023/05/Website-Food-Banner-Design-scaled.jpg"
            alt=""
          />
        </div>
      </Slide>
      <Slide key="1">
        <div class="carousel__item">
          <img
            width="100%"
            height="100%"
            src="https://graphicsfamily.com/wp-content/uploads/edd/2023/05/Website-Food-Banner-Design-scaled.jpg"
            alt=""
          />
        </div>
      </Slide>
      <Slide key="3">
        <div class="carousel__item">
          <img
            width="100%"
            height="100%"
            src="https://graphicsfamily.com/wp-content/uploads/edd/2023/05/Website-Food-Banner-Design-scaled.jpg"
            alt=""
          />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
.carousel__item {
  height: 77vh;
  width: 100vw;
  font-size: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3f3f3;

  img {
    object-fit: cover;
  }

  h1 {
    font-size: 50px;
  }

  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span {
      text-align: left;
      margin: 40px 0;
      color: gray;
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
