<template>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Name
      <q-input
        lazy-rules
        outlined
        v-model="name"
        placeholder="Luis"
        @blur="validatInput('name')"
        @keypress="validatInput('name')"
        @update:modelValue="updateValue('name', $event)"
      />
    </label>
    <p class="error" v-if="!!validateMessage.errors.name">
      {{ validateMessage.errors.last_name }}
    </p>
  </div>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Apellido
      <q-input
        lazy-rules
        outlined
        v-model="lastName"
        placeholder="Perez"
        @blur="validatInput('last_name')"
        @keypress="validatInput('last_name')"
        @update:modelValue="updateValue('last_name', $event)"
      />
    </label>
    <p class="error" v-if="!!validateMessage.errors.last_name">
      {{ validateMessage.errors.last_name }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const props = defineProps({
  useForm: {
    type: Object,
    required: true
  },
  validatInput: {
    type: Function,
    required: true
  },
  validateMessage: {
    type: Object,
    required: true
  }
})

const name = ref(props.useForm.name)
const lastName = ref(props.useForm.last_name)

const emit = defineEmits(['update:modelValue'])

const updateValue = (key, value) => {
  emit('update:modelValue', { key, value })
}
</script>
