<template>
  <q-card class="my-card" @click="handleLink">
    <q-card-section class="column items-center justify-center">
      <q-img
        :src="icon"
        spinner-color="dark"
        style="height: 58px; max-width: 62px"
        fit="contain"
      />
      <p class="q-ma-none body-large">{{ title }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
});

const handleLink = () => {
  router.push(props.link);
};
</script>

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
</style>
