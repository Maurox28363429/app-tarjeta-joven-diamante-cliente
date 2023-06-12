<script setup props="props">
import { ref, defineEmits } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
  description: {
    type: String,
    required: true,
    default: '',
  },
});

const value = ref(props.showModal);

const emit = defineEmits(['update:showModal']);

const updateValue = (key, value) => {
  emit('update:showModal', key, value);
};
</script>

<template>
  <q-dialog
    v-model="value"
    persistent
    transition-show="scale"
    transition-hide="scale"
    @update:modelValue="updateValue(value, $event)"
  >
    <q-card class="" style="width: 300px">
      <q-card-section class="">
        <p class="text-center title-large">{{ description }}</p>
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="Luego" v-close-popup />
        <q-btn flat label="Ver planes" v-close-popup to="/memberships" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
