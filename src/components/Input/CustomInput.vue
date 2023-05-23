<template>
  <div>
    <label :for="inputId">{{ label }}</label>
    <q-input
      outlined
      type="text"
      v-model="value"
      @blur="validatInput(inputId)"
      @keypress="validatInput(inputId)"
      @update:modelValue="updateValue(inputId, $event)"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from 'vue'

const props = defineProps({
  label: String,
  inputId: String,
  modelValue: String,
  placeholder: String,
  validatInput: Function
})
const value = ref(props.modelValue)

const emit = defineEmits(['update:modelValue'])

const updateValue = (key, value) => {
  emit('update:modelValue', { key, value })
}
</script>
