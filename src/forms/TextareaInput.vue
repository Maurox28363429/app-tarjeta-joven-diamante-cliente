<script setup>
import { defineProps, ref, defineEmits, watch } from 'vue';

const props = defineProps({
  initialValue: {
    type: [String, Number],
    required: true,
  },
  validatInput: {
    type: Function,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
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

watch(
  () => props.initialValue,
  (newValue) => {
    value.value = newValue;
  }
);

const handledChange = (e) => {
  updateValue(props.name, e);
};
</script>

<template>
  <div class="full-width">
    <q-editor
      :label="label"
      lazy-rules
      outlined
      autocomplete="nope"
      v-model="value"
      :placeholder="placeholder"
      @blur="validatInput(name)"
      @change="handledChange"
      @keypress="validatInput(name)"
      @keyup="validatInput(name)"
      @update:modelValue="updateValue(name, $event)"
    />
    <p class="text-error" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
