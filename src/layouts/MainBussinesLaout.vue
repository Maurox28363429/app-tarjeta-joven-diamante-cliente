<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userAuth } from 'src/composables/userAuth'
import QRScanner from 'src/components/QRScanner.vue'
import qrIcon from './../assets/images/qr.jpg'
import logo from '../assets/icons/acronimo.svg'

const { userData } = userAuth()
const { push, go } = useRouter()

const leftDrawerOpen = ref(false)
const show = ref(false)
const miniState = ref(true)

const handledReadQr = () => {
  show.value = !show.value
}

const handledLogout = (e) => {
  e.preventDefault()
  localStorage.removeItem('user')
  push('/login')
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = true
  miniState.value = !miniState.value
}

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false
    e.stopPropagation()
  }
}
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
        <div @click="go(-1)">
          <q-icon
            name="arrow_back"
            size="md"
            color="dark"
            class="cursor-pointer"
          />
        </div>
        <q-toolbar-title class="row items-center">
          <q-img
            :src="logo"
            spinner-color="dark"
            @click="push('/empresa')"
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
        <router-link to="/empresa/account" class="cursor-pointer">
          <q-avatar size="42px" class="q-ml-md">
            <q-img :src="userData?.img_url" spinner-color="dark" />
          </q-avatar>
        </router-link>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="!leftDrawerOpen || miniState"
      @click.capture="drawerClick"
      :width="214"
      :breakpoint="700"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <div
        class="q-mini-drawer-hide absolute"
        style="top: 15px; right: -17px; z-index: 20"
      >
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-separator inset v-show="!miniState" />
          <q-item clickable v-ripple to="/empresa/account">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>Mi perfil</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/empresa/orders">
            <q-item-section avatar>
              <q-icon name="receipt_long" />
            </q-item-section>

            <q-item-section>Ordenes</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/empresa/create-order">
            <q-item-section avatar>
              <q-icon name="border_color" />
            </q-item-section>

            <q-item-section>Crear orden</q-item-section>
          </q-item>
        </q-list>
        <div
          @click="handledLogout"
          class="row justify-center full-width full-height body-small"
        >
          <q-btn
            icon="power_settings_new"
            :label="!miniState ? 'Cerrar sesión' : ''"
            text-color="white"
            class="body-small"
            style="position: absolute; bottom: 20px; background-color: #ba1a1a"
          />
        </div>
      </q-scroll-area>

      <div v-show="!miniState" class="absolute-top" style="height: 150px">
        <div class="column items-center absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="userData?.img_url" />
          </q-avatar>
          <div class="text-weight-bold">
            ¡Hola, {{ userData?.name + " " + userData?.last_name }}!
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
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="show"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="qrModal">
        <QRScanner :close-modal="show" @close-modal="show = false" />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-px-sm q-py-lg">
      <div class="qrButton">
        <q-btn round size="md" color="primary" @click="handledReadQr">
          <q-img :src="qrIcon" width="24px" height="24px" alt="QR" />
        </q-btn>
      </div>
    </div>
    <q-tabs
      style="z-index: 100"
      dense
      class="menuMobile bg-primary text-white justify-center full-width fixed-bottom"
      align="center"
      narrow-indicator
    >
      <q-route-tab
        name="cuenta"
        label="Cuenta"
        color="white"
        class="text-capitalize q-px-none"
        icon="person"
        to="/empresa/account"
        exact
      />
      <q-route-tab
        name="Ordenes"
        label="Ordenes"
        color="white"
        class="text-capitalize q-px-none"
        icon="receipt_long"
        to="/empresa/orders"
        exact
      />
      <q-route-tab
        name="crear order"
        to="/empresa/create-order"
        label="Crear orden"
        color="white"
        class="text-capitalize q-px-none"
        icon="border_color"
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
  .menu {
    display: none;
  }
  .menuMobile {
    display: block;
  }
  .qrButton {
    bottom: 64px;
  }
  .qrModal {
    min-width: 100%;
  }
}
</style>
