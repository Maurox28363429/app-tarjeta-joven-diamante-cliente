<template>
  <div class="pin-input">
    <div class="pin-input-container">
      <input
        v-for="(item, index) in values"
        :key="index"
        class="pin-input-box"
        type="text"
        :value="item"
        maxlength="1"
        @keydown="handleKeyDown($event, index)"
        @input="handleInput($event, index)"
        @paste="handlePaste($event)"
        :ref="'input-' + index"
        :data-index="index"
      />
    </div>
    <q-btn
      @click="() => submit(values.join(''))"
      label="Enviar código"
      :loading="loading"
      size="14px"
      fill
      height="48px"
      color="primary"
      class="full-width q-mb-md"
      type="submit"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'src/composables/useToast'

const { triggerWarning } = useToast()

defineProps({
  submit: {
    type: Function,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})

const values = ref(['', '', '', '', '', '', ''])

function handleKeyDown (event, index) {
  const key = event.key
  const input = document.querySelector(`[data-index="${index}"]`)

  if (input) {
    if (key === 'Backspace') {
      values.value.splice(index, 1, '')

      if (index > 0) {
        const prevInput = document.querySelector(`[data-index="${index - 1}"]`)
        prevInput.focus()
      }
    } else if (key === 'ArrowRight' && index < values.value.length - 1) {
      const nextInput = document.querySelector(`[data-index="${index + 1}"]`)
      nextInput.focus()
    } else if (key === 'ArrowLeft' && index > 0) {
      const prevInput = document.querySelector(`[data-index="${index - 1}"]`)
      prevInput.focus()
    }
  }
}

function handleInput (event, index) {
  const value = event.data
  if (value && value.match(/^[0-9a-zA-Z]$/)) {
    values.value.splice(index, 1, value)

    if (index < values.value.length - 1) {
      const nextInput = document.querySelector(`[data-index="${index + 1}"]`)
      nextInput.focus()
    }
  } else {
    values.value.splice(index, 1, '')
  }
}

function handlePaste (event) {
  event.preventDefault()
  const pasteData = event.clipboardData.getData('text/plain')
  if (
    pasteData &&
    pasteData.match(/^[0-9a-zA-Z]+$/) &&
    pasteData.length <= values.value.length
  ) {
    for (let i = 0; i < pasteData.length; i++) {
      values.value.splice(i, 1, pasteData[i])
    }
  }
  if (pasteData.length > values.value.length) {
    triggerWarning('El código debe ser de 7 dígitos.')
  }
}
</script>

<style scoped>
.pin-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pin-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.pin-input-box {
  border: none;
  border-bottom: 4px solid #4d57a9;
  background: #dfe0ff;
  border-radius: 4px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  width: 44px;
  outline: none;
  margin: 0 2px;
}
</style>
