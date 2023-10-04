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
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (key, value) => {
  emits('update:modelValue', { key, value });
};

const value = ref(props.initialValue);

const handledChange = (e) => {
  updateValue(props.name, e);
  props.validateInput(props.name);
  console.log(e, 'hanlde change');
};
</script>

<template>
  <div class="full-width">
    <q-date :label="label" v-model="value" @update:modelValue="handledChange" />
    <p class="text-error" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
