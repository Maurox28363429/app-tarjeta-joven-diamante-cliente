<template>
  <p class="q-ml-lg q-mt-lg title-large">Ofertas</p>
  <div class="full-width full-height row justify-center q-mt-lg">
    <q-input
      v-model="search"
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
  <div
    class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg"
  >

  <template v-if="loading">
        <div v-for="index in 20" :key="index" class="skeleton-card">
          <q-card class="my-card" style="height: 460px; width: 250px;">
            <q-skeleton height="200px" width="250px" square />
            <q-card-section>
              <q-skeleton style="margin-bottom: 10px;" type="QSlider" />
              <q-skeleton style="margin-bottom: 10px;" type="QSlider" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
              <q-skeleton type="text" class="text-caption" />
            </q-card-section>
          </q-card>
        </div>
      </template>

    <div
      v-for="items in products"
      :key="items.id"
    >
      <q-card class="my-card" style="height: 460px; width: 250px;">
        <img
          style="height: 200px; width: 250px; max-height: 200px;"
          :src="
            items.img_array_url[0]
              ? items.img_array_url[0]
              : 'https://cdn.quasar.dev/img/mountains.jpg'
          "
        />

        <q-card-section>
          <q-list>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="primary" name="add_shopping_cart" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ items.nombre }}</q-item-label>
                <q-item-label caption>
                  <q-icon color="primary" name="add_shopping_cart" />
                  {{ items.comercio.name }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="red" name="sell" />
              </q-item-section>

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
</template>

<script setup>
// importaciones
import { ref, onMounted, watch } from 'vue'
import { instance } from 'src/api/index.js'
import { userAuth } from 'src/composables/userAuth'
// user auth
const { user } = userAuth()
console.log(user)
// variables
const currentPaginate = ref(1)
const paginas = ref(0)
const products = ref([])
const search = ref('')
const loading = ref(false)
// los observadores
watch(currentPaginate, async (val) => {
  await getProducts()
})
watch(search, async (val) => {
  await getProducts()
})
async function getProducts () {
  try {
    loading.value = true
    const { data } = await instance
      .get(
        '/comercio-ofertas?with[]=comercio&nombre=' +
        search.value +
        '&page=' +
        currentPaginate.value
      )
    products.value = data.data
    paginas.value = data.pagination.lastPage
    currentPaginate.value = data.pagination.currentPage
  } catch (error) {

  } finally {
    loading.value = false
  }
}

// eventos hooks
onMounted(async () => {
  await getProducts()
})
</script>

<style>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
