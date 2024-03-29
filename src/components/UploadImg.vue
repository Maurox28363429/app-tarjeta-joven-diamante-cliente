<template>
  <label>
    <div @drop.prevent="onDrop" :class="isActive">
      <input
        :value="null"
        type="file"
        hidden
        @change="handleFile"
        @keypress="validate"
        @blur="validate"
        name="img"
      />
      <div v-if="!file" class="justify-center column items-center">
        <q-icon name="cloud_download" color="primary" size="60px" />
        <p class="text-subtitle1 q-mb-none text-center">
          Sube o arrastra tu imagen aqui
        </p>
      </div>
      <q-img
        :src="file"
        v-if="file"
        style="max-width: 300px; max-height: 300px"
      />
    </div>
    <p class="error" v-if="!!validateMessage?.errors?.img">
      {{ validateMessage?.errors?.img }}
    </p>
  </label>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, defineProps } from 'vue';

const props = defineProps({
  validatInput: {
    type: Function,
    required: false,
  },
  validateMessage: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(['files-dropped', 'validate']);
const active = ref(false);
const file = ref(null);

const validate = () => {
  if (props.validatInput) {
    props?.validatInput('img');
    emit('validate');
  }
};

const handleFile = (e) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    file.value = URL.createObjectURL(files[0]);
    emit('files-dropped', files[0]);
    if (props.validatInput) {
      props.validatInput('img');
    }
  }
};

const uploadContainer =
  'cursor-pointer column items-center justify-center upload-container relative-position q-pa-md';

const isActive = computed(() => {
  return active.value
    ? `${uploadContainer} active`
    : `${uploadContainer}  no-active`;
});

function onDrop(e) {
  emit('files-dropped', [...e.dataTransfer.files]);
  file.value = URL.createObjectURL(e.dataTransfer.files[0]);
}

function preventDefaults(e) {
  e.preventDefault();
}

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, (e) => {
      e.preventDefault();
      if (eventName === 'dragover') {
        active.value = true;
      } else {
        active.value = false;
      }

      if (eventName === 'dragleave' && props.validatInput) {
        props.validatInput('img');
      }
    });
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<style lang="sass">

.upload-container
    min-height: 140px

.active
    height: 300px
    border: 4px dotted $primary
    background: rgba(77, 87, 169, 0.48)
    color: white

.no-active
    height: 300px
    border: 4px dotted $grey
    color: $secondary
</style>
