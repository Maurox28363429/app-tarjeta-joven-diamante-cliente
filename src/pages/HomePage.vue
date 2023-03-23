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
            style="height: 58px; max-width: 140px"
          />
          Tarjeta joven Diamante
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
