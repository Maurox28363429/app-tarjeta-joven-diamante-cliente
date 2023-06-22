<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  value1: {
    type: String,
    required: true,
  },
  value2: {
    type: String,
    required: true,
  },
});

const value1 = ref(props.value1);
const value2 = ref(props.value2);
</script>

<template>
  <div class="row">
    <q-input outlined v-model="value1" />
    <q-input outlined v-model="value2" />
  </div>
</template>
