<script setup>
import { defineProps } from 'vue';
import { userAuth } from 'src/composables/userAuth';

const { userData } = userAuth();

defineProps({
  benefits: {
    type: Array,
    required: true,
  },
  price: {
    type: String,
    required: true,
    default: '0',
  },
  name: {
    type: String,
    required: true,
    default: '',
  },
  image: {
    type: String,
    required: true,
    default: '',
  },
  id: {
    type: Number,
    required: true,
  },
});

const baseurl = '/memberships/';
</script>

<template>
  <div class="plan">
    <q-img
      :src="image"
      spinner-color="dark"
      style="height: 58px; max-width: 62px"
    />
    <p class="title-large text-center text-secondary text-uppercase q-my-md">
      <span v-if="price > 0">
        {{ name }}
      </span>
      <span v-if="price == 0"> Membresia 3 Días </span>
    </p>
    <p class="text-weight-medium text-h3" v-if="price > 0">
      <span class="text-h5">$</span>{{ price }}
    </p>
    <p class="text-weight-medium text-h3" v-if="price == 0">
      <span class="text-h5"></span>Gratis
    </p>
    <ul class="benefitsList">
      <li v-for="(benefit, index) of benefits" :key="index">
        <q-img
          src="./../assets/icons/checkIcon.svg"
          spinner-color="dark"
          style="height: 22px; max-width: 22px"
        />
        <p class="body-medium">{{ benefit }}</p>
      </li>
      <li v-if="price > 0">
        <q-img
          src="./../assets/icons/checkIcon.svg"
          spinner-color="dark"
          style="height: 22px; max-width: 22px"
        />
        <p class="body-medium">
          Seguro privado 24 horas exclusivo para miembros de tarjeta joven
          diamante
        </p>
      </li>
    </ul>
    <p
      class="text-weight-medium text-h3"
      v-if="price > 0"
      style="text-align: center !important"
    >
      <span style="font-size: 0.5em">Precio de pre-venta por lanzamiento</span>
    </p>
    <div class="full-width button">
      <q-btn
        :disable="
          userData?.membresia?.status === 'activa' ||
          (price <= 0 && userData?.membresia?.type !== 'permitir_gratuita')
        "
        outline
        color="secondary"
        :label="price > 0 ? 'Comprar' : 'Obtener'"
        class="full-width"
        :to="baseurl + id"
      />
    </div>
  </div>
</template>

<style>
.plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3),
    0px 2px 6px 2px rgba(0, 0, 0, 0.15);
  width: 320px;
  min-height: 427px;
  border-radius: 4px;
  padding: 32px;
  background: #ffffff;
}

.benefitsList p {
  margin: 0;
}

.benefitsList li {
  gap: 8px;
  align-items: center;
  width: 100%;
  display: flex;
}

.benefitsList {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
