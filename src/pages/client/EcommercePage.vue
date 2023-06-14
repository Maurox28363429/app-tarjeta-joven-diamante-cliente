<script setup>
import { ref } from 'vue';

const search = ref('');

const submit = () => {
  console.log(search.value);
};
</script>

<template>
  <div>
    <p class="q-ma-none text-subtitle1 full-width">Sos</p>
    <div class="full-width full-height row justify-center q-mt-lg">
      <q-form class="full-width row justify-center" @submit="submit">
        <q-input
          class="full-width"
          rounded
          v-model="search"
          style="max-width: 400px"
          outlined
          type="search"
          label="Buscar ofertas"
          color="primary"
        >
          <q-btn
            type="submit"
            size="md"
            style="
              right: -12px;
              bottom: 0;
              top: 0;
              border-radius: 0 26px 26px 0;
            "
            color="primary"
            label="Buscar"
            icon="search"
            class="absolute"
          />
        </q-input>
      </q-form>
    </div>
  </div>
</template>
