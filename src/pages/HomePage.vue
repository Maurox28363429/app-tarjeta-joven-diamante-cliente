<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white q-py-sm text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          color="dark"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <q-img
            src="../assets/acronimo.svg"
            spinner-color="white"
            style="height: 40px; max-width: 98px"
          />
          Tarjeta joven Diamante
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above side="left">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple to="/home">
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>Dashboard </q-item-section>
          </q-item>

          <q-item active clickable v-ripple to="/home">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Perfil</q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Movimientos</q-item-section>
          </q-item>
        </q-list>
        <div
          @click="handledLogout"
          class="row justify-center full-width full-height"
        >
          <q-btn
            color="primary"
            label="Log out"
            style="position: absolute; bottom: 20px"
          />
        </div>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="column items-center absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ user.name + ' ' + user.last_name }}
          </div>
          <div>{{ user.email }}</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
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
      <div style="position: fixed; z-index: 100; right: 24px; bottom: 24px">
        <q-fab color="primary" icon="keyboard_arrow_up" direction="up">
          <q-fab-action color="primary" @click="handleModal">
            <img src="./../assets/qr.jpg" style="width: 24px; height: 24px" />
          </q-fab-action>
          <q-fab-action color="secondary" icon="alarm" />
        </q-fab>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QrUser from 'src/components/QrUser.vue'
import { userAuth } from 'src/composables/userAuth'

const { user } = userAuth()

console.log(user.id)

const leftDrawerOpen = ref(false)
const router = useRouter()

const show = ref(false)

const handleModal = () => {
  show.value = !show.value
}

console.log(show.value, 'show')

const handledLogout = (e) => {
  e.preventDefault()
  localStorage.removeItem('user')
  router.push('/login')
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
