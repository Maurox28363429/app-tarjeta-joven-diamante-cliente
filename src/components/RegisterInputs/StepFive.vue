<template>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Documento de identidad
      <q-file
        @update:modelValue="updateValue('dni', $event)"
        outlined
        bottom-slots
        v-model="idCard"
        label="archivo.jpg/.png/.pdf"
        :filter="checkFileType"
        max-files="1"
      >
        <template v-slot:before>
          <q-icon name="cloud_upload" />
        </template>

        <template v-slot:append>
          <q-icon
            v-if="idCard !== null"
            name="close"
            @click.stop.prevent="idCard = null"
            class="cursor-pointer"
          />
          <q-icon name="search" @click.stop.prevent />
        </template>
      </q-file>
    </label>
  </div>
</template>

<script setup>
import { ref } from "vue";

const checkFileType = (files) => {
  return files.filter(
    (file) =>
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "application/pdf"
  );
};

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

const idCard = ref(props.useForm.dni);

const emit = defineEmits(["update:modelValue"]);

const updateValue = (key, value) => {
  emit("update:modelValue", { key, value });
};
</script>
