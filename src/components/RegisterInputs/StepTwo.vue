<script setup>
import { defineEmits, ref } from 'vue';

const props = defineProps({
  useForm: {
    type: Object,
    required: true,
  },
  validatInput: {
    type: Function,
    required: true,
  },
  validateMessage: {
    type: Object,
    required: true,
  },
});

const email = ref(props.useForm.email);
const phone = ref(props.useForm.phone);

const emit = defineEmits(['update:modelValue']);

const updateValue = (key, value) => {
  emit('update:modelValue', { key, value });
};
</script>

<template>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Email
      <q-input
        lazy-rules
        outlined
        v-model="email"
        name="email"
        autocomplete="nope"
        placeholder="example@gmail.com"
        @blur="validatInput('email')"
        @keypress="validatInput('email')"
        @update:modelValue="updateValue('email', $event)"
      />
    </label>
    <p class="error" v-if="!!validateMessage.errors.email">
      {{ validateMessage.errors.email }}
    </p>
  </div>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Telefono
      <q-input
        lazy-rules
        type="tel"
        outlined
        mask="#### - ####"
        placeholder="6208-8987"
        v-model="phone"
        name="phone"
        autocomplete="nope"
        @blur="validatInput('phone')"
        @keypress="validatInput('phone')"
        @update:modelValue="updateValue('phone', $event)"
      />
    </label>
    <p class="error" v-if="!!validateMessage.errors.phone">
      {{ validateMessage.errors.phone }}
    </p>
  </div>
</template>
