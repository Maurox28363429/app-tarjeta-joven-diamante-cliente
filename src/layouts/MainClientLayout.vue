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
            src="../assets/acronimo.svg"
            spinner-color="dark"
            @click="goHome"
            style="height: 32px; max-width: 74px; cursor: pointer"
          />
        </q-toolbar-title>
        <q-btn
          style="height: 35px; width: 35px; display: none"
          fill
          round
          icon="shopping_cart"
          color="secondary"
        />
        <router-link to="/cliente/account" class="cursor-pointer">
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
              <p class="text-weight-bold text-h6 q-ma-none">
                Plan {{ user?.membresia?.type }}
              </p>
              <p
                class="text-weight-medium text-subtitle2 text-grey-6 q-ma-none"
              >
                Quendan: {{ user?.membresia?.days }} días
              </p>
            </q-item-section>
          </q-item>
          <q-separator inset v-show="!miniState" />
          <q-item clickable v-ripple to="/cliente/shopping">
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <q-item-section>Mis compras</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/news">
            <q-item-section avatar>
              <q-icon name="newspaper" />
            </q-item-section>

            <q-item-section>Promociones</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/account">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>Mi perfil</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/cliente/products">
            <q-item-section avatar>
              <q-icon name="sell" />
            </q-item-section>

            <q-item-section>Ofertas</q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/memberships">
            <q-item-section avatar>
              <q-icon name="rocket_launch" />
            </q-item-section>

            <q-item-section>Membresías</q-item-section>
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
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            ¡Hola, {{ user.name + " " + user.last_name }}!
          </div>
          <div>
            <p
              class="text-center"
              style="text-overflow: ellipsis; overflow: hidden; width: 196px"
            >
              {{ user.email }}
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
      <q-card>
        <QrUser />
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="q-px-sm q-py-lg">
      <div class="qrButton">
        <q-fab color="primary" icon="keyboard_arrow_up" direction="up">
          <q-fab-action
            @click="handleModal"
            color="primary"
            :disable="user.membresia.status == 'vencida' ? true : false"
          >
            <img src="./../assets/qr.jpg" style="width: 24px; height: 24px" />
          </q-fab-action>
        </q-fab>
      </div>
    </div>
    <q-tabs
      style="position: fixed; z-index: 100; bottom: 0; width: 100%"
      dense
      class="menuMobile bg-primary text-white justify-center"
      align="center"
      narrow-indicator
    >
      <router-link
        to="/cliente/shopping"
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
        to="/cliente/products"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="Ofertas"
          label="Ofertas"
          color="white"
          class="text-capitalize q-px-none"
          icon="sell"
        />
      </router-link>
      <router-link
        to="/cliente/news"
        style="text-decoration: none; color: #ffff; width: 100%; margin: none"
      >
        <q-tab
          name="Promociones"
          label="Promociones"
          color="white"
          class="text-capitalize q-px-none"
          icon="newspaper"
        />
      </router-link>
    </q-tabs>
    <UpdateMembershipModal
      :showModal="showModalNew()"
      description="Obten 5 días de pueba con el plan free, y recibe ofertas especiales"
    />
    <UpdateMembershipModal
      :showModal="showModalRenovar()"
      description="Renueva el plan, y recibe ofertas especiales"
    />
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
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userAuth } from 'src/composables/userAuth'
import UpdateMembershipModal from '../components/UpdateMembershipModal.vue'
import format from 'src/utils/date'
import QrUser from '../components/QrUser.vue'

const { user } = userAuth()

const goHome = () => {
  console.log('goHome')
  router.push('/empresa')
}

const leftDrawerOpen = ref(false)
const router = useRouter()

const show = ref(false)

const showModalRenovar = () => {
  if (user?.membresia?.days === 1) {
    return true
  }
  return false
}

const handleModal = () => {
  show.value = true
}

const showModalNew = () => {
  if (format(user?.membresia?.updated_at) === format(new Date())) {
    return true
  }
  return false
}

const miniState = ref(true)

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
  if (miniState.value) {
    miniState.value = false

    e.stopPropagation()
  }
}

onMounted(() => {
  if (user.value.membresia.type === 'permitir_gratuita') {
    router.push('/memberships')
  }
})
</script>
