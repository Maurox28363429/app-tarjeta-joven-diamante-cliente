<script setup>
import { ref } from "vue";

const GENDER_OPTIONS = ["Hombre", "Mujer"];

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

const sex = ref(props.useForm.sex);
const password = ref(props.useForm.password);
const isVisible = ref(false);

const showPassword = () => {
  isVisible.value = !isVisible.value;
};

const emit = defineEmits(["update:modelValue"]);

const updateValue = (key, value) => {
  emit("update:modelValue", { key, value });
};
</script>

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
        :type="isVisible ? 'text' : 'password'"
        outlined
        v-model="password"
        placeholder="********"
        @blur="validatInput('password')"
        @keypress="validatInput('password')"
        @update:modelValue="updateValue('password', $event)"
      >
        <template v-slot:append>
          <q-icon
            @click="showPassword"
            class="cursor-pointer"
            :name="isVisible ? 'visibility' : 'visibility_off'"
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
