<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const { push } = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#',
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
});
const handleLink = () => {
  if (props.enabled) {
    push(props.link);
  } else {
    console.log('deshabilitado');
  }
};
</script>

<template>
  <q-card class="my-card" @click="handleLink">
    <q-card-section class="column items-center justify-center full-width">
      <q-img
        :src="icon"
        spinner-color="dark"
        fit="contain"
        height="72px"
        width="72px"
      />
      <p class="q-ma-none body-large">{{ title }}</p>
    </q-card-section>
  </q-card>
</template>

<style>
.my-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 20px;
  height: 140px;
  width: 140px;
}

@media (min-width: 700px) {
  .my-card {
    height: 160px;
    width: 160px;
  }
}
</style>
