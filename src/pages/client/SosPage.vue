<script setup>
import { ref } from 'vue';
import { useGetHelpNumber } from 'src/querys/sosQuerys';

const search = ref('');
const page = ref(1);

const { data, isLoading, refetch } = useGetHelpNumber({ page, search });
const handleNumber = (phone) => {
  window.open(`https://wa.me/507${phone}`, '_blank');
};
</script>

<template>
  <div class="full-width q-pa-md">
    <div class="full-width column items-center">
      <p class="q-ma-none text-h6 full-width">Sos</p>
      <p class="q-ma-none text-subtitle2 full-width text-grey">
        Centro de ayuda
      </p>

      <q-img
        src="../../assets/images/helpCenter.png"
        alt="Help Center"
        width="207px"
        height="167px"
      />
      <q-form
        @submit.prevent="refetch"
        class="full-width q-my-md row justify-center"
      >
        <q-input
          class="full-width"
          rounded
          dense
          v-model="search"
          style="max-width: 400px"
          outlined
          type="search"
          label="Buscar sos"
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
      <p class="full-width text-justify text-subtitle2">
        Personas que pueden ayudarte:
      </p>

      <div
        class="q-gutter-y-md full-width"
        v-if="!isLoading"
        style="max-width: 500px"
      >
        <q-card
          v-for="item in data?.data"
          :key="item.id"
          class="full-width row items-center"
        >
          <q-card-section
            class="row full-width items-center justify-between q-gutter-x-md"
          >
            <q-avatar>
              <img
                :src="item.img"
                alt="Help Center"
                style="object-fit: cover"
              />
            </q-avatar>
            <div>
              <p class="q-ma-none">{{ item.name }}</p>
              <p class="q-ma-none">{{ item.descripcion }}</p>
            </div>

            <q-btn
              label="contactar"
              size="sm"
              color="secondary"
              @click="handleNumber(item.phone)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
