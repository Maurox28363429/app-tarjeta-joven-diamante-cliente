<script setup>
import { ref } from 'vue';
import shoesimg from '../../assets/images/shoes.png';

const search = ref('');

const submit = () => {
  console.log(search.value);
};

const heavyList = [
  {
    name: 'Recargas',
    icon: 'phone',
  },
  {
    name: 'Comida',
    icon: 'fastfood',
  },
  {
    name: 'Ropa',
    icon: 'checkroom',
  },
  {
    name: 'recargas',
    icon: 'phone',
  },
  {
    name: 'recargas',
    icon: 'phone',
  },
];

const products = [
  {
    id: 1,
    name: 'Zapatos',
    price: 100,
    img: shoesimg,
  },
  {
    id: 1,
    name: 'Zapatos',
    price: 100,
    img: shoesimg,
  },
  {
    id: 1,
    name: 'Zapatos',
    price: 100,
    img: shoesimg,
  },
  {
    id: 1,
    name: 'Zapatos',
    price: 100,
    img: shoesimg,
  },
];
</script>

<template>
  <div class="q-pa-md">
    <p class="q-ma-none text-h6 full-width">Recargas</p>
    <div class="full-width full-height row q-mt-lg">
      <q-form class="full-width row justify-center" @submit="submit">
        <q-input
          class="full-width"
          rounded
          v-model="search"
          style="max-width: 400px"
          outlined
          type="search"
          label="Buscar pproductos"
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
      <div class="full-width q-my-md">
        <p class="q-ma-none full-width text-subtitle1">Servicios</p>
        <q-virtual-scroll
          virtual-scroll-horizontal
          :items="heavyList"
          v-slot="{ item, index }"
        >
          <q-card
            :key="index"
            style="height: 72px; width: 72px"
            class="q-pa-none row justify-center items-center q-ma-sm"
          >
            <q-card-section
              class="column items-center justify-center q-pa-none"
            >
              <q-icon :name="item.icon" size="md" />
              <p class="q-ma-none">{{ item.name }}</p>
            </q-card-section>
          </q-card>
        </q-virtual-scroll>
      </div>

      <div class="row wrap q-gutter-sm justify-center">
        <q-card
          style="width: 160px; height: 300px"
          v-for="item in products"
          :key="item.id"
        >
          <img
            :src="item.img"
            style="height: 160px; width: 100%; object-fit: contain"
            alt="Shoes"
          />
          <q-separator />
          <q-card-section>
            <p class="q-ma-none">{{ item.name }}</p>
            <p class="q-ma-none text-weight-medium text-body1">
              ${{ item.price }}
            </p>
          </q-card-section>
          <q-card-actions align="end" class="full-width q-py-none">
            <q-btn
              label="Comprar"
              color="secondary"
              size="sm"
              class="full-width"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>
