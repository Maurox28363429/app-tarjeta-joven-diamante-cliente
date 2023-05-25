<script setup>
import logo from "../assets/icons/acronimo.svg";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="q-py-sm" style="background: #e9e9e9">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            :src="logo"
            spinner-color="white"
            height="40px"
            width="98px"
            alt="Logo"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
