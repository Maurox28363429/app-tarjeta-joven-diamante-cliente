<template>
  <div class="q-px-md">
    <p style="margin: 20px 0" class="title-large">Ofertas</p>
    <div class="full-width full-height row justify-center q-mt-lg">
      <q-input
        class="full-width"
        v-model="search"
        style="max-width: 400px"
        outlined
        type="search"
        label="Buscar ofertas"
        color="primary"
      >
        <template v-slot:append>
          <q-icon name="search" v-model="search" />
        </template>
      </q-input>
    </div>
    <div class="full-width full-height product-grid">
      <template v-if="loading">
        <div v-for="index in 20" :key="index" class="skeleton-card">
          <q-card class="my-card" style="height: 340px; width: 100%">
            <q-skeleton height="120px" width="100%" square />
            <q-card-section class="q-px-xs">
              <q-skeleton style="margin-bottom: 10px" type="QSlider" />
              <q-skeleton style="margin-bottom: 10px" type="QSlider" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
            </q-card-section>
          </q-card>
        </div>
      </template>

      <div v-for="items in products" :key="items.id">
        <q-card class="my-card" style="height: 340px; width: 100%">
          <img
            style="height: 120px; width: 100%; max-height: 200px"
            :src="
              items.img_array_url[0]
                ? items.img_array_url[0]
                : 'https://cdn.quasar.dev/img/mountains.jpg'
            "
          />

          <q-card-section class="q-px-xs">
            <q-list>
              <q-item clickable class="q-ma-none q-pa-none">
                <div class="q-mr-md q-ml-xs row items-center">
                  <q-icon size="xs" color="primary" name="add_shopping_cart" />
                </div>

                <q-item-section class="q-ma-none q-pa-none">
                  <q-item-label>{{ items.nombre }}</q-item-label>
                  <q-item-label caption>
                    <q-icon
                      size="xs"
                      color="primary"
                      name="add_shopping_cart"
                    />
                    {{ items.comercio.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable class="q-ma-none q-pa-none">
                <div class="q-mr-md q-ml-xs row items-center">
                  <q-icon size="xs" color="red" name="sell" />
                </div>

                <q-item-section>
                  <q-item-label>{{ items.price_total }} $</q-item-label>
                  <q-item-label caption
                    >Descuento{{ items.descuento }} %</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <p class="line-clamp-4">{{ items.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div
      class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg"
    >
      <q-pagination
        style="margin-top: 1em"
        v-model="currentPaginate"
        :max="paginas"
        boundary-numbers
      />
    </div>
  </div>
</template>

<script setup>
// importaciones
import { ref, onMounted, watch } from "vue";
import { instance } from "src/api/index.js";
import { useToast } from "src/composables/useToast";

const currentPaginate = ref(1);
const paginas = ref(0);
const products = ref([]);
const search = ref("");
const loading = ref(false);

const { triggerWarning } = useToast();

// los observadores
watch(currentPaginate, async (val) => {
  await getProducts();
});
watch(search, async (val) => {
  await getProducts();
});

async function getProducts() {
  try {
    loading.value = true;
    const { data } = await instance.get(
      "/comercio-ofertas?with[]=comercio&nombre=" +
        search.value +
        "&page=" +
        currentPaginate.value
    );
    products.value = data.data;
    paginas.value = data.pagination.lastPage;
    currentPaginate.value = data.pagination.currentPage;
  } catch (error) {
    console.error(error);
    const errorMessage =
      error.code === "ERR_NETWORK"
        ? "Verifique su conexión a internet e intente nuevamente"
        : "Error desconocido";
    triggerWarning(errorMessage);
  } finally {
    loading.value = false;
  }
}

// eventos hooks
onMounted(async () => {
  await getProducts();
});
</script>

<style>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px 7px;
  justify-content: center;
  padding: 20px 0;
}
</style>
