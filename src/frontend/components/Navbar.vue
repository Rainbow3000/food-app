<script setup lang="ts">
import { useProduct } from "@/composables/useProduct";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const { setUser } = useUserStore();
const { user } = storeToRefs(useUserStore());
const { cartList } = storeToRefs(useCartStore());
const cartStore = useCartStore();
const { getProducts } = useProduct();
const { setFilter } = useProductStore();

const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
  cartStore.$reset();
};

const q = ref<string>("");

const handleFilter = async () => {
  setFilter({ q: q.value });

  setTimeout(async () => {
    await getProducts();
  }, 1000);
};

const isAdmin = computed(() =>
  user?.value?.userRoles?.find((item) => item.role.roleName === "super_admin")
);

const handleToHome = () => {
  window.location.href = "/";
};
</script>

<template>
  <div class="navbar">
    <div class="top">
      <div class="top-item logo">
        <div style="cursor: pointer" @click="handleToHome">
          <img
            style="object-fit: cover"
            width="max-content"
            height="45px"
            src="/food.png"
            alt=""
          />
        </div>
      </div>
      <div class="top-item search">
        <input
          @input="handleFilter"
          v-model="q"
          type="text"
          placeholder="Search food..."
        />
        <button>
          <el-icon>
            <Search />
          </el-icon>
        </button>
      </div>
      <div class="top-item action">
        <div v-if="isAdmin" class="item">
          <i class="pi pi-building-columns"></i>&nbsp;
          <router-link
            style="color: inherit; text-decoration: none"
            to="/admin/dashboard"
          >
            <span style="font-weight: 300; color: gray">Dashboard</span>
          </router-link>
        </div>
        <div class="item">
          <i class="pi pi-bell"></i>&nbsp;
          <router-link
            style="color: inherit; text-decoration: none"
            to="/notification"
          >
            <span style="font-weight: 300; color: gray"> Notification </span>
          </router-link>
        </div>
        <div class="item" v-if="user">
          <i class="pi pi-shopping-bag"></i>&nbsp;
          <router-link
            style="color: inherit; text-decoration: none"
            to="/my-order"
          >
            <span style="font-weight: 300; color: gray">Order</span>
          </router-link>
        </div>
        <div class="item">
          <i class="pi pi-heart"></i>&nbsp;
          <span style="font-weight: 300; color: gray">Favourite</span>
        </div>
        <div class="item">
          <i class="pi pi-shopping-cart"></i>&nbsp;
          <router-link style="color: inherit; text-decoration: none" to="/cart"
            ><span style="font-weight: 300; color: gray"
              >Cart (<b style="color: red">{{ cartList.length }}</b
              >)</span
            ></router-link
          >
        </div>
        <div class="item" v-if="!user">
          <router-link
            style="color: inherit; text-decoration: none; margin-right: 20px"
            to="/login"
            ><el-button class="btn-auth" style="font-weight: 300; color: gray"
              >Login</el-button
            ></router-link
          >

          <router-link
            style="color: inherit; text-decoration: none"
            to="/register"
            ><el-button class="btn-auth" style="font-weight: 300; color: gray"
              >Register</el-button
            ></router-link
          >
        </div>

        <div v-if="user" class="item">
          <i class="pi pi-user"></i>&nbsp;
          <span
            ><b>{{ user.userName }}</b></span
          >
        </div>

        <div v-if="user" class="item" @click="handleLogout">
          <el-button
            style="
              font-weight: 300;
              height: 45px;
              background-color: orangered;
              color: white;
            "
            >Sign out</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <div class="hr"></div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 20px 150px;
  font-weight: 500;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #ffffff;
  border-bottom: 0.5px solid #eeeeee;
  font-family: "Roboto", sans-serif;

  :deep(.el-dropdown-link) {
    &:hover {
      border: none;
      outline: none;
    }
  }

  .top {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;

    .top-item {
      margin: 0 20px;
      width: max-content;
    }

    .search {
      border: 1px solid orangered;
      border-radius: 5px;
      height: 45px;
      display: flex;
      align-items: center;
      width: 20%;

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        border-radius: 5px;
        padding-left: 10px;

        &::placeholder {
          font-weight: 300;
        }
      }

      button {
        width: 60px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: orangered;
        color: white;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;

        &:hover {
          color: white;
          background-color: orangered;
        }
      }
    }

    .action {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      right: 0;

      .item {
        display: flex;
        align-items: center;
        width: max-content;
        margin-left: 45px;
        height: max-content;
        cursor: pointer;
      }

      .btn-auth {
        height: 45px;
        &:hover {
          background-color: orangered;
          color: #ffffff !important;
        }
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;

    ul {
      width: 100%;
      display: flex;
      list-style: none;
      justify-content: center;
      align-items: flex-end;
      margin-top: 10px;

      li {
        margin: 0 50px;
        cursor: pointer;
        padding-bottom: 5px;

        &.active {
          border-bottom: 3px solid #3f51b5;
        }
      }
    }
  }
}

.hr {
  width: 100%;
  height: 1px;
  background-color: rgba(128, 128, 128, 0.205);
  margin-top: 10px;
}
</style>
