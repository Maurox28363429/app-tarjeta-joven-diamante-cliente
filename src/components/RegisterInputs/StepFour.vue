<script setup>
import { computed, ref, watchEffect } from 'vue';
import { useGetStates } from 'src/querys/offersQuerys';

const OPTIONS = [];
for (let i = 0; i < 50; i++) {
  OPTIONS.push(`Promotor ${i}`);
}

const { data } = useGetStates({});

const provinceOptions = computed(() =>
  data.value?.data.map((element) => {
    return element.name;
  })
);

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

const vendedor = ref(props.useForm.vendedor);
const provincia = ref([]);

watchEffect(() => {
  if (provincia.value.length > 2) {
    provincia.value.pop();
  }
});

const emit = defineEmits(['update:modelValue']);
const stringOptions = ref(OPTIONS);

const updateValue = (key, value) => {
  emit('update:modelValue', { key, value });
};

const filterFn = (val, update) => {
  if (val.length < 1) {
    return;
  }
  if (val !== '') {
    const needle = val.toLowerCase();
    update(() => {
      stringOptions.value = OPTIONS.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    });
  } else {
    update(() => {
      stringOptions.value = OPTIONS;
    });
  }
};
</script>

<template>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Promotor que lo atendio
      <q-select
        outlined
        use-input
        input-debounce="0"
        label="promotores"
        v-model="vendedor"
        autocomplete="nope"
        :options="stringOptions"
        @blur="validatInput('vendedor')"
        @keypress="validatInput('vendedor')"
        name="vendedor"
        @update:modelValue="updateValue('vendedor', $event)"
        @filter="filterFn"
        behavior="menu"
      ></q-select>
      <p class="error" v-if="!!validateMessage.errors.vendedor">
        {{ validateMessage.errors.vendedor }}
      </p>
    </label>
  </div>
  <div class="q-ma-none full-width input">
    <label class="label-large">
      Provincia que suele visitar
      <q-select
        outlined
        v-model="provincia"
        multiple
        autocomplete="nope"
        :options="provinceOptions"
        @update:modelValue="updateValue('provincia', $event)"
        @blur="validatInput('provincia')"
        @keypress="validatInput('provincia')"
        use-chips
        name="provincia"
        stack-label
        label="Provincias"
      />
      <p class="error" v-if="!!validateMessage.errors.provincia">
        {{ validateMessage.errors.provincia }}
      </p>
    </label>
  </div>
</template>
