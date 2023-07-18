<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userAuth } from 'src/composables/userAuth';
import logo from '../assets/icons/acronimo.svg';
import {
  ADMIN_MENU_DESKTOP,
  ADMIN_MENU_MOBILE,
} from 'src/shared/constansts/adminMenu';

const { userData } = userAuth();
const { push, go } = useRouter();

const leftDrawerOpen = ref(false);

const handledLogout = (e) => {
  e.preventDefault();
  localStorage.removeItem('user');
  push('/login');
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="q-py-sm text-white"
      style="
        height: 60px;
        background: #f8fdff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
          0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      "
    >
      <q-toolbar class="row items-center">
        <q-btn
          class="menu"
          dense
          flat
          round
          icon="menu"
          color="dark"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="row items-center">
          <q-img
            :src="logo"
            spinner-color="dark"
            @click="push('/')"
            class="cursor-pointer"
            height="32px"
            width="74px"
            alt="Logo"
          />
        </q-toolbar-title>
        <q-btn
          style="height: 35px; width: 35px; display: none"
          fill
          round
          icon="shopping_cart"
          color="secondary"
        />
        <router-link to="/" class="cursor-pointer">
          <q-avatar size="42px" class="q-ml-md">
            <q-img :src="userData?.img_url" spinner-color="dark" />
          </q-avatar>
        </router-link>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="700"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-separator inset />
          <q-item
            v-for="item in ADMIN_MENU_DESKTOP"
            :key="item.name"
            clickable
            v-ripple
            :to="item.path"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
        <div
          @click="handledLogout"
          class="row justify-center full-width full-height body-small"
        >
          <q-btn
            icon="power_settings_new"
            label="Cerrar sesión"
            text-color="white"
            class="body-small"
            style="position: absolute; bottom: 20px; background-color: #ba1a1a"
          />
        </div>
      </q-scroll-area>

      <div class="absolute-top" style="height: 150px">
        <div class="column items-center absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="userData?.img_url" />
          </q-avatar>
          <div class="text-weight-bold">
            ¡Hola, {{ userData?.name + ' ' + userData?.last_name }}!
          </div>
          <div>
            <p
              class="text-center"
              style="text-overflow: ellipsis; overflow: hidden; width: 196px"
            >
              {{ userData?.email }}
            </p>
          </div>
        </div>
      </div>
    </q-drawer>
    <q-page-container style="background: #f8fdff">
      <div @click="go(-1)" class="q-px-md q-pt-sm">
        <q-icon
          name="arrow_back"
          size="md"
          color="dark"
          class="cursor-pointer"
        />
      </div>
      <router-view />
    </q-page-container>
    <q-tabs
      style="z-index: 100"
      dense
      class="menuMobile bg-primary text-white justify-center full-width fixed-bottom"
      align="center"
      narrow-indicator
    >
      <q-route-tab
        v-for="item in ADMIN_MENU_MOBILE"
        :key="item.label"
        :name="item.label"
        :label="item.label"
        color="white"
        class="text-capitalize q-px-none full-width"
        :icon="item.icon"
        :to="item.path"
        exact
      />
    </q-tabs>
  </q-layout>
</template>

<style>
aside {
  position: fixed !important;
}

.logoutButton {
  background: #ba1a1a;
}

.menu {
  display: flex;
  align-items: center;
}

.menuMobile {
  display: none;
}

.qrButton {
  position: fixed;
  z-index: 100;
  right: 24px;
  bottom: 6px;
}

.qrModal {
  min-width: 480px;
  min-height: 424px;
}

@media (max-width: 700px) {
  .qrButton {
    bottom: 64px;
  }
  .qrModal {
    min-width: 100%;
  }
}
</style>
