<script setup>
import { ref, watchEffect } from 'vue';
import { useGetProducts } from 'src/querys/productQuery';
import { useProductCart } from 'src/stores/useProductCart';
import { useToast } from 'src/composables/useToast';

const pages = ref(1);
const lastPage = ref(1);
const itemsPerPage = ref([]);
const { triggerPositive } = useToast();

const store = useProductCart();

const search = ref('');

const {
  data: products,
  refetch,
  isLoading: isLoadingNews,
} = useGetProducts({
  pages,
  search,
});

watchEffect(() => {
  if (products.value && !isLoadingNews.value) {
    pages.value = products?.value?.pagination?.currentPage;
    lastPage.value = products?.value?.pagination?.lastPage;
    itemsPerPage.value = [products?.value?.pagination?.itemsPerPage];
  }
});

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

const addToCart = (item) => {
  triggerPositive('Producto agregado al carrito');
  store.setProduct(item);
};
</script>

<template>
  <div class="q-pa-md">
    <p class="q-ma-none text-h6 full-width">Recargas</p>
    <div class="full-width full-height row q-mt-lg">
      <q-form class="full-width row justify-center" @submit="refetch">
        <q-input
          class="full-width"
          rounded
          v-model="search"
          style="max-width: 400px"
          outlined
          dense
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

      <div v-if="!isLoadingNews" class="row wrap q-gutter-sm justify-center">
        <template v-for="item in products?.data" :key="item.id">
          <q-card style="width: 160px; height: 300px" class="column">
            <router-link :to="'ecommerce/' + item.id">
              <img
                :src="item.img"
                style="height: 160px; width: 100%; object-fit: contain"
                alt="Shoes"
              />
            </router-link>
            <q-separator />
            <q-card-section>
              <p class="q-ma-none">{{ item.nombre }}</p>
              <p class="q-ma-none text-weight-medium text-body1">
                ${{ item.precio }}
              </p>
            </q-card-section>
            <q-card-actions class="full-width q-py-none" style="flex: 1">
              <q-btn
                label="Comprar"
                color="secondary"
                size="sm"
                @click="addToCart(item)"
                class="full-width self-end q-mb-sm"
              />
            </q-card-actions>
          </q-card>
        </template>
      </div>
    </div>
  </div>
</template>
