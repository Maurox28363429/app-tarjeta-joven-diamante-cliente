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
        <q-icon name="search" v-model="search"/>
      </template>
    </q-input>
  </div>
  <div
    class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg"
  >
    <div
      style="min-height: 250px; width: 250px"
      v-for="items in products"
      :key="items.id"
    >
      <q-card class="my-card">
        <img :src="(items.img_array_url[0])? items.img_array_url[0]:'https://cdn.quasar.dev/img/mountains.jpg' " />

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
                <q-item-label caption>Descuento{{ items.descuento }} %</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ items.description }}
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div  class="full-width full-height row wrap q-gutter-lg justify-center q-my-lg">
    <q-pagination
    style="margin-top: 1em;"
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
// los observadores
watch(currentPaginate, async (val) => {
  await getProducts()
})
watch(search, async (val) => {
  await getProducts()
})
function getProducts () {
  instance
    .get('/comercio-ofertas?with[]=comercio&nombre=' + search.value + '&page=' + currentPaginate.value)
    .then((res) => {
      console.log(res.data)
      products.value = res.data.data
      paginas.value = res.data.pagination.lastPage
      currentPaginate.value = res.data.pagination.currentPage
    })
    .catch((err) => {
      console.log(err)
    })
};
// eventos hooks
onMounted(async () => {
  await getProducts()
})
</script>
