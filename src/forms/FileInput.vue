<script setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps({
  initialValue: {
    type: [String, Number, null],
    required: true,
  },
  validateInput: {
    type: Function,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  acceptedTypes: {
    type: Array,
    default: () => ['image/jpeg', 'image/png', 'image/jpg', 'jpg'],
  },
  maxFiles: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (key, value) => {
  emits('update:modelValue', { key, value });
};

const value = ref(props.initialValue);

const handledChange = (e) => {
  updateValue(props.name, e);
  props.validateInput(props.name);
};
</script>

<template>
  <div class="full-width">
    <q-file
      outlined
      :max-files="maxFiles"
      :label="label"
      v-model="value"
      @update:modelValue="handledChange"
    >
      <template v-slot:prepend>
        <slot />
      </template>
    </q-file>
    <p class="text-error" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
