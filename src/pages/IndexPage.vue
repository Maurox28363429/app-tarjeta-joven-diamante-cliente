<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" text-color="black" :label="maria" to="maria"/>
    <q-btn color="primary" label="Primary" />
    <q-btn color="secondary" label="Secondary" />
    <q-btn color="amber" glossy label="Amber" />
    <q-btn color="brown-5" label="Brown 5" />
    <q-btn color="deep-orange" glossy label="Deep Orange" />
    <q-btn color="purple" label="Purple" />
    <q-btn color="black" label="Black" />
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
const maria=ref('maria');
onMounted(()=>{
  maria.value="bracho";
});
</script>
