<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="q-py-sm text-white"
      style="
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
        <q-toolbar-title class="row justify-center items-center">
          <q-img
            src="../assets/acronimo.svg"
            spinner-color="dark"
            style="height: 40px; max-width: 98px"
          />
        </q-toolbar-title>
        <q-btn fill round icon="shopping_cart" color="secondary" />
        <router-link to="/account" class="cursor-pointer">
          <q-avatar size="42px" class="q-ml-md">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
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
          <q-item>
            <q-item-section>
              <p class="text-weight-bold text-h6 q-ma-none">Plan free</p>
              <p
                class="text-weight-medium text-subtitle2 text-grey-6 q-ma-none"
              >
                Quendan: 5 días
              </p>
            </q-item-section>
          </q-item>
          <q-separator inset v-show="!miniState" />
          <q-item clickable v-ripple to="/shopping">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>

            <q-item-section>Mis compras</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/account">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>Mi perfil</q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/store">
            <q-item-section avatar>
              <q-icon name="store" />
            </q-item-section>

            <q-item-section>Comercios</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/memberships">
            <q-item-section avatar>
              <q-icon name="rocket_launch" />
            </q-item-section>

            <q-item-section>Membresías</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/products">
            <q-item-section avatar>
              <q-icon name="local_offer" />
            </q-item-section>

            <q-item-section>Productos</q-item-section>
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
            style="position: absolute; bottom: 20px; background-color: #410002"
          />
        </div>
      </q-scroll-area>

      <div v-show="!miniState" class="absolute-top" style="height: 150px">
        <div class="column items-center absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            ¡Hola, {{ user.name + ' ' + user.last_name }}!
          </div>
          <div>{{ user.email }}</div>
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
      <q-card>
        <QrUser />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-px-sm q-py-lg">
      <div style="position: fixed; z-index: 100; right: 24px; bottom: 64px">
        <q-fab color="primary" icon="keyboard_arrow_up" direction="up">
          <q-fab-action color="primary" @click="handleModal">
            <img src="./../assets/qr.jpg" style="width: 24px; height: 24px" />
          </q-fab-action>
        </q-fab>
      </div>
    </div>
    <q-tabs
      v-model="tab"
      style="
        position: fixed;
        z-index: 100;
        bottom: 0;
        width: 100%;
        border-radius: 16px 16px 0 0;
      "
      dense
      class="menuMobile bg-primary text-white justify-center"
      align="justify-center"
      narrow-indicator
    >
      <router-link
        to="/shopping"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="misCompras"
          label="Mis compras"
          color="white"
          class="text-capitalize q-px-none"
          icon="shopping_basket"
        />
      </router-link>
      <router-link
        to="/store"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="Comercios"
          label="Comercios"
          color="white"
          class="text-capitalize q-px-none"
          icon="store"
        />
      </router-link>
      <router-link
        to="/products"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="Productos"
          label="Productos"
          class="text-capitalize"
          color="white"
          icon="local_offer"
        />
      </router-link>
      <router-link
        to="/account"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="cuenta"
          label="cuenta"
          class="text-capitalize q-px-none"
          color="white"
          icon="person"
        />
      </router-link>
    </q-tabs>
  </q-layout>
</template>

<style>
aside {
  position: fixed !important;
}

.logoutButton {
  background: #410002;
}

.menu {
  display: flex;
  align-items: center;
}

.menuMobile {
  display: none;
}

@media (max-width: 700px) {
  .menu {
    display: none;
  }
  .menuMobile {
    display: block;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QrUser from 'src/components/QrUser.vue'
import { userAuth } from 'src/composables/userAuth'

const { user } = userAuth()

const leftDrawerOpen = ref(false)
const router = useRouter()

const show = ref(false)
const miniState = ref(true)

const handleModal = () => {
  show.value = !show.value
}

const handledLogout = (e) => {
  e.preventDefault()
  localStorage.removeItem('user')
  router.push('/login')
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = true
  miniState.value = !miniState.value
}

const drawerClick = (e) => {
  // if in "mini" state and user
  // click on drawer, we switch it to "normal" mode
  if (miniState.value) {
    miniState.value = false

    // notice we have registered an event with capture flag;
    // we need to stop further propagation as this click is
    // intended for switching drawer to "normal" mode only
    e.stopPropagation()
  }
}
</script>
