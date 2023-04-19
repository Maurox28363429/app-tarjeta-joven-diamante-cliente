<template>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Genero
      <q-select
        outlined
        lazy-rules
        class="full-width q-ma-none"
        v-model="sex"
        :options="GENDER_OPTIONS"
        @update:modelValue="updateValue('sex', $event)"
      />
    </label>
    <p class="error" v-if="!!validateMessage.errors.sex">
      {{ validateMessage.errors.sex }}
    </p>
  </div>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Contraseña
      <q-input
        lazy-rules
        :type="typePassword"
        outlined
        v-model="password"
        placeholder="********"
        @blur="validatInput('password')"
        @keypress="validatInput('password')"
        @update:modelValue="updateValue('password', $event)"
      >
        <template v-slot:append>
          <q-icon
            @click="showPassword()"
            class="cursor-pointer"
            :name="iconPassword"
            color="primary"
          />
        </template>
      </q-input>
    </label>
    <p class="error" v-if="!!validateMessage.errors.password">
      {{ validateMessage.errors.password }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const GENDER_OPTIONS = ['Hombre', 'Mujer']

const typePassword = ref('password')
const iconPassword = ref('visibility_off')

const showPassword = () => {
  if (typePassword.value === 'password') {
    typePassword.value = 'text'
    iconPassword.value = 'visibility'
  } else {
    typePassword.value = 'password'
    iconPassword.value = 'visibility_off'
  }
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

const sex = ref(props.useForm.sex)
const password = ref(props.useForm.password)

const emit = defineEmits(['update:modelValue'])

const updateValue = (key, value) => {
  emit('update:modelValue', { key, value })
}
</script>
