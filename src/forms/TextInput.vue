<script setup>
import { defineProps, ref, defineEmits } from 'vue';

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
  type: {
    type: String,
    default: 'text',
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
  updateValue(name, e);
};
</script>

<template>
  <div class="full-width">
    <q-input
      :label="label"
      lazy-rules
      :type="type"
      outlined
      autocomplete="nope"
      v-model="value"
      :placeholder="placeholder"
      @blur="validatInput(name)"
      @change="handledChange"
      @keypress="validatInput(name)"
      @keyup="validatInput(name)"
      @update:modelValue="updateValue(name, $event)"
    >
      <template v-slot:prepend>
        <slot />
      </template>
    </q-input>

    <p class="text-error" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>
