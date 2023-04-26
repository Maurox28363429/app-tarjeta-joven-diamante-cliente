<template>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Promotor que lo atendio
      <q-select
        filled
        use-input
        input-debounce="0"
        label="promotores"
        v-model="vendedor"
        :options="stringOptions"
        @update:modelValue="updateValue('vendedor', $event)"
        @filter="filterFn"
        behavior="menu"
      ></q-select>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const OPTIONS = []
for (let i = 0; i < 50; i++) {
  OPTIONS.push(`Promotor ${i}`)
}

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

const vendedor = ref(props.useForm.vendedor)

const emit = defineEmits(['update:modelValue'])
const stringOptions = ref(OPTIONS)
const updateValue = (key, value) => {
  emit('update:modelValue', { key, value })
}

const filterFn = (val, update) => {
  if (val.length < 1) {
    return
  }
  if (val !== '') {
    const needle = val.toLowerCase()
    update(() => {
      stringOptions.value = OPTIONS.filter(v => v.toLowerCase().indexOf(needle) > -1)
    })
  } else {
    update(() => {
      stringOptions.value = OPTIONS
    })
  }
}
</script>
