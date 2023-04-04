<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentPaginate"
      :max="5"
    />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
const currentPaginate = ref(1)
watch(currentPaginate, (val) => {
  console.log(val)
})
onMounted(() => {
  console.log('Hello World')
})
</script>
