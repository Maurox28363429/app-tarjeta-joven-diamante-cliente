<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="q-py-sm" style="background: #e9e9e9">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="../assets/icons/acronimo.svg"
            spinner-color="white"
            style="height: 40px; max-width: 98px"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
