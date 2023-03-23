<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" text-color="black" label="login" to="login" />
    <q-btn color="primary" label="Register" to="register" />
    <q-btn color="secondary" label="dashboard" to="home" />
    <q-btn color="amber" glossy label="memberships" to="memberships" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const maria = ref('maria')

onMounted(() => {
  maria.value = 'bracho'
})
</script>
